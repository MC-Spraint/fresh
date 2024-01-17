import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import { AuthService } from "src/shared/auth/auth.service";
import { EmailService } from "src/shared/services/email/email.service";
import { SaveUserDto } from "./dto/request/save-user.request";
import { LogInUserDto } from "./dto/request/login-user.request";
import { SignupUserDto } from "./dto/request/signup-user.request";
import { UserRepository } from "./user.repository";
import { Email } from "../shared/services/email/entities/email.entity";
import { JwtPayloadDto } from "src/shared/auth/dto/jwt-payload.dto";
import { UpdateRoleDto } from "./dto/request/update-role.request";
import { UserRoles } from "../shared/shared/enums/userRoles.enum";
import { EmailTemplateService } from "src/shared/services/email/email.template.service";
import { User } from "./entity/user.entity";
import { Onboardings } from "./dto/onboardings.dto";
import { MailResponse } from "./dto/mail-response.dto";
import { TwilioService } from "src/shared/services/twilio/twilio.service";
import { MobileLoginRequest } from "./dto/request/mobile-login.request";
import { ResendOTPRequest } from "./dto/request/resend-otp.request";
import { OTPVerificationRequest } from "./dto/request/otp-verification.request";
import { VerifyOTP } from "./dto/verify-otp.dto";
import { UpdateMobile } from "./dto/request/update-mobile.request";
import { ChangeRoleRequest } from "./dto/request/change-role.request";
import { Types } from "mongoose";
@Injectable()
export class UserService {
  private constructSignupMail(
    user: User,
    protocol: string,
    host: string,
  ): Email {
    const { _id, name, email, email_verification_token } = user;
    if (user.email_verification_token === null)
      throw new BadRequestException("Your profile has been already verified");
    const deeplink: string =
      protocol +
      "://" +
      host +
      "/api/user/" +
      _id.toString() +
      "/verify-signup-email?token=" +
      email_verification_token.toString();
    const recipient: string = email;
    const subject = "Verification Email";
    const message = this._templateService.getEmailVerificationTemplate({
      userName: name,
      deeplink,
    });
    return new Email(_id, recipient, subject, message);
  }

  private constructForgotPasswordMail(
    user: User,
    protocol: string,
    host: string,
  ): Email {
    const { _id, name, email, forgot_password_token } = user;
    const deeplink: string =
      protocol +
      "://" +
      host +
      "/api/user/verify-forgot-password?id=" +
      _id.toString() +
      "&token=" +
      forgot_password_token.toString();

    const recipient: string = email;
    const subject = "Reset Password";
    const message = this._templateService.getForgotPasswordTemplate({
      userName: name,
      deeplink,
    });
    return new Email(_id, recipient, subject, message);
  }

  private async generateOnboardingsAndUpdateInUser(
    user: User,
  ): Promise<Onboardings> {
    const { _id, store_id, name, email, role } = user;
    const payload: JwtPayloadDto = {
      _id: _id,
      store_id: store_id,
      name: name,
      email: email,
      role: role,
    };
    const tokens = await this._authService.getTokens(payload);
    const salt = 10;
    const refreshTokenHash = this._authService.generateHash(
      tokens.refresh_token,
      salt,
    );
    await this._userRepo.findOneAndUpdate(
      { _id: _id },
      { refresh_token: refreshTokenHash },
    );
    return { ...payload, tokens };
  }
  private readonly logger: Logger;
  private readonly testUserCountry: string = "+91";
  private readonly testUserMobile: string = "9999999999";
  private readonly testUserOTP: string = "999999";
  constructor(
    private readonly _authService: AuthService,
    private readonly _userRepo: UserRepository,
    private readonly _emailService: EmailService,
    private readonly _templateService: EmailTemplateService,
    private readonly _otpService: TwilioService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  public async mobileLogin({
    country_code,
    mobile,
  }: MobileLoginRequest): Promise<Partial<User>> {
    let user = await this._userRepo.getUserByMobileNumber(country_code, mobile);
    if (!user) {
      user = await this._userRepo.createAndSave({
        country_code,
        mobile: mobile,
      });
    }
    const fullMobileNumber = country_code.concat(mobile);
    //TODO: Remove this if statement in prod
    const testUserCountry = this.testUserCountry;
    const testUserMobile = this.testUserMobile;
    if (fullMobileNumber === testUserCountry.concat(testUserMobile)) {
      return {
        _id: user._id,
      };
    }
    const otpSecret = await this._otpService.generateSecret();
    const OTP = await this._otpService.generateOTP(6, otpSecret);
    await this._userRepo.updateUserById(String(user._id), {
      verification_otp_secret: otpSecret,
    });
    await this._otpService.sendVerificationOTP(fullMobileNumber, OTP);
    return {
      _id: user._id,
    };
  }

  public async verifyOTP({
    user_id,
    otp,
  }: OTPVerificationRequest): Promise<VerifyOTP> {
    const user = await this._userRepo.getUserById(String(user_id));
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const isNewUser = !user.is_verified;
    //TODO: Remove this if statement in production
    const testUserMobile = this.testUserMobile;
    const testUserOTP = this.testUserOTP;
    if (user.mobile === testUserMobile && otp === testUserOTP) {
      const tokens = await this.generateOnboardingsAndUpdateInUser(user);
      await this._userRepo.updateUserById(String(user._id), {
        is_mobile_verified: true,
        is_verified: true,
      });
      return { ...tokens, isNewUser };
    }
    if (!user.verification_otp_secret)
      throw new BadRequestException(`OTP Is Already Used`);
    const isValidOTP = await this._otpService.verifyOTP(
      otp,
      user.verification_otp_secret,
    );
    if (!isValidOTP) throw new BadRequestException(`Incorrect OTP`);
    await this._userRepo.updateUserById(String(user._id), {
      verification_otp_secret: null,
    });
    const tokens = await this.generateOnboardingsAndUpdateInUser(user);
    await this._userRepo.updateUserById(String(user._id), {
      is_mobile_verified: true,
      is_verified: true,
    });
    return { ...tokens, isNewUser };
  }

  public async resendOTP({
    user_id,
  }: ResendOTPRequest): Promise<Partial<User>> {
    const user = await this._userRepo.getUserById(user_id);
    const fullMobileNumber = user.country_code.concat(user.mobile);
    const otpSecret = await this._otpService.generateSecret();
    const OTP = await this._otpService.generateOTP(6, otpSecret);
    await this._userRepo.updateUserById(String(user._id), {
      verification_otp_secret: otpSecret,
    });
    await this._otpService.sendVerificationOTP(fullMobileNumber, OTP);
    return { _id: user._id };
  }

  public async signUpUser(
    user: SignupUserDto,
    host: string,
    protocol: string,
  ): Promise<MailResponse | string> {
    const usersPresence = await this._userRepo.findOne({
      email: user.email,
    });
    const userNotVerified = await this._userRepo.findOne({
      email: user.email,
      email_verification_token: { $ne: null },
    });
    if (userNotVerified)
      throw new BadRequestException(
        "Check your email, we already sent you a link",
      );
    if (usersPresence) {
      throw new BadRequestException("Email is already taken");
    }
    const EVT: string = "verify" + Math.random() * 100 + 54;
    const hashedPassword = this._authService.hashPassword(user.password);
    const newUser: SaveUserDto = new SaveUserDto(
      user.name,
      user.email,
      hashedPassword,
      EVT,
    );
    const res = await this._userRepo.createAndSave(newUser);
    const { _id, recipient, subject, message } = this.constructSignupMail(
      res,
      protocol,
      host,
    );
    const mailResponse: SentMessageInfo =
      await this._emailService.sendEmailTest(recipient, subject, message);
    const verificationEmailResponse: MailResponse = {
      _id,
      mailResponse,
    };
    return verificationEmailResponse;
  }

  public async resendVerificationLink(
    userId: string,
    protocol: string,
    host: string,
  ): Promise<MailResponse | string> {
    const user: User = await this._userRepo.getEmailNotVerifiedUserById(userId);
    const EVT: string = "verify" + Math.random() * 100 + 54;
    const updateUserEVT = await this._userRepo.updateUserById(
      String(user._id),
      {
        email_verification_token: EVT,
      },
    );
    const { _id, recipient, subject, message } = this.constructSignupMail(
      updateUserEVT,
      protocol,
      host,
    );
    const mailResponse: SentMessageInfo =
      await this._emailService.sendEmailTest(recipient, subject, message);
    const verificationEmailResponse: MailResponse = {
      _id,
      mailResponse,
    };
    return verificationEmailResponse;
  }

  public async verify(id: string, token: string): Promise<string> {
    const verifiedUser = await this._userRepo.updateUserEmailAsVerified(
      id,
      token,
    );
    if (verifiedUser === null) throw new NotFoundException("NOT_FOUND");
    return "Verified";
  }

  private splitMobileNumber(mobile_with_country_code: string): {
    country_code: string;
    mobile: string;
  } {
    const country_code = mobile_with_country_code.substring(
      0,
      mobile_with_country_code.length - 10,
    );
    const mobile = mobile_with_country_code.substring(
      mobile_with_country_code.length - 10,
      mobile_with_country_code.length,
    );
    return { country_code, mobile };
  }
  public async logIn(user: LogInUserDto): Promise<Onboardings> {
    let verifiedUser: User;
    const isEmail = user.email_or_mobile.includes("@");
    if (!isEmail) {
      const mobWithCountry = this.splitMobileNumber(user.email_or_mobile);
      verifiedUser = await this._userRepo.findOne({
        country_code: mobWithCountry.country_code,
        mobile: mobWithCountry.mobile,
        is_mobile_verified: true,
      });
      if (verifiedUser === null) {
        throw new NotFoundException("Incorrect Mobile");
      }
    } else {
      verifiedUser = await this._userRepo.findOne({
        email: user.email_or_mobile,
        is_email_verified: true,
      });
      if (verifiedUser === null) {
        throw new NotFoundException("Incorrect email");
      }
    }
    const { password } = verifiedUser;
    const isPasswordMatched: boolean = this._authService.compareHash(
      user.password,
      password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException("Incorrect password!");
    }
    const onboardings = this.generateOnboardingsAndUpdateInUser(verifiedUser);
    return onboardings;
  }

  public async sendTokens(refresh_token: string): Promise<Onboardings> {
    const payload = await this._authService.validateRefreshToken(refresh_token);
    const user = await this._userRepo.findOne({ _id: payload["_id"] });
    if (user === null) throw new NotFoundException("NOT_FOUND");
    if (
      this._authService.compareHash(refresh_token, user.refresh_token) === false
    )
      throw new UnauthorizedException("Invalid token");
    const onboardings = this.generateOnboardingsAndUpdateInUser(user);
    return onboardings;
  }

  public async logout(_id: string): Promise<boolean> {
    const userToBeLoggedOut = await this._userRepo.findOneAndUpdate(
      { _id: _id, is_verified: true },
      { refresh_token: null },
    );
    if (userToBeLoggedOut !== null && userToBeLoggedOut !== undefined)
      return true;
    else return false;
  }

  public async forgotPassword(
    emailId: string,
    host: string,
    protocol: string,
  ): Promise<MailResponse> {
    const FPT: string = "verify" + Math.random() * 100 + 54;
    const forgotPasswordUser: User =
      await this._userRepo.setUsersForgotPasswordtoken(emailId, FPT);
    const { _id, recipient, subject, message } =
      this.constructForgotPasswordMail(forgotPasswordUser, protocol, host);
    const mailResponse: SentMessageInfo =
      await this._emailService.sendEmailTest(recipient, subject, message);
    const verificationEmailResponse: MailResponse = { _id, mailResponse };
    return verificationEmailResponse;
  }

  public async verifyForgotPassword(
    id: string,
    token: string,
  ): Promise<string> {
    const { forgot_password_token } = await this._userRepo.getUserById(id);
    if (token !== forgot_password_token)
      throw new NotFoundException("Not_FOUnd");
    return "Verified";
  }

  public async resetPassword(
    id: string,
    token: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = this._authService.hashPassword(password);
    const verifiedAndUpdatedUser: User = await this._userRepo.resetPassword(
      id,
      token,
      hashedPassword,
    );
    if (!verifiedAndUpdatedUser) throw new NotFoundException("NOT_FOUND");
    return verifiedAndUpdatedUser;
  }

  public async updatePassword(
    user_id: string,
    password: string,
  ): Promise<User> {
    const user = await this._userRepo.getUserById(user_id);
    if (!user) throw new NotFoundException("NOT_FOUND");
    const newPasswordHash = this._authService.hashPassword(password);
    const updatedUser = await this._userRepo.updateUserById(user_id, {
      password: newPasswordHash,
    });
    if (!updatedUser) new NotFoundException("NOT_FOUND");
    return updatedUser;
  }

  public async updateName(user_id: string, name: string): Promise<User> {
    const user = await this._userRepo.getUserById(user_id);
    if (!user) throw new NotFoundException("NOT_FOUND");
    const updatedUser = await this._userRepo.updateUserById(user_id, {
      name: name,
    });
    if (!updatedUser) new NotFoundException("NOT_FOUND");
    return updatedUser;
  }

  public async updateMobile(
    user_id: string,
    body: UpdateMobile,
  ): Promise<Partial<User>> {
    const user = await this._userRepo.getUserById(user_id);
    if (!user) throw new NotFoundException("NOT_FOUND");
    const fullMobileNumber = body.country_code.concat(body.mobile);
    const otpSecret = await this._otpService.generateSecret();
    const OTP = await this._otpService.generateOTP(6, otpSecret);
    await this._userRepo.updateUserById(String(user._id), {
      verification_otp_secret: otpSecret,
    });
    await this._otpService.sendVerificationOTP(fullMobileNumber, OTP);
    await this._userRepo.updateUserById(user_id, {
      country_code: body.country_code,
      mobile: body.mobile,
      is_mobile_verified: false,
    });
    await this._otpService.sendVerificationOTP(fullMobileNumber, OTP);
    return user._id;
  }

  public async verifyMobile({
    user_id,
    otp,
  }: OTPVerificationRequest): Promise<Partial<User>> {
    const user = await this._userRepo.getUserById(String(user_id));
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (!user.verification_otp_secret)
      throw new BadRequestException(`OTP Is Already Used`);
    const isValidOTP = await this._otpService.verifyOTP(
      otp,
      user.verification_otp_secret,
    );
    if (!isValidOTP) throw new BadRequestException(`Incorrect OTP`);
    await this._userRepo.updateUserById(String(user._id), {
      verification_otp_secret: null,
    });
    await this._userRepo.updateUserById(String(user._id), {
      is_mobile_verified: true,
    });
    return user._id;
  }

  //TODO: Add Controller for this
  public async changeRole(
    user_id: Types.ObjectId,
    { role }: ChangeRoleRequest,
  ): Promise<Onboardings> {
    const user = await this._userRepo.getUserById(String(user_id));
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const elligibleRoles = [UserRoles.USER];
    if (user.store_id) elligibleRoles.push(UserRoles.ADMIN);
    if (user.partner_id) elligibleRoles.push(UserRoles.DELIVERY_PARTNER);
    if (!elligibleRoles.includes(role))
      throw new ForbiddenException(`Permission Denied`);
    await this._userRepo.updateUserById(String(user_id), {
      role: role,
    });
    const tokens = await this.generateOnboardingsAndUpdateInUser(user);
    return tokens;
  }
  // ######################### SUPER_ADMIN #########################
  public async updateRole(
    super_admin_id: string,
    id: string,
    updateRole: UpdateRoleDto,
  ): Promise<User> {
    //TODO: Verify admin first
    const { role } = updateRole;
    const updatedUser = await this._userRepo.updateUserById(id, {
      role: role,
    });
    if (updatedUser !== null) return updatedUser;
    else throw new NotFoundException("NOT_FOUND");
  }
  public async getAllUsers(): Promise<User[]> {
    //TODO: Verify admin first
    const users = await this._userRepo.find({ role: UserRoles.USER });
    return users;
  }
  public async getAllAdmins(): Promise<User[]> {
    //TODO: Verify admin first
    const users = await this._userRepo.find({ role: UserRoles.ADMIN });
    return users;
  }
  public async getAllSuperAdmins(): Promise<User[]> {
    //TODO: Verify admin first
    const users = await this._userRepo.find({ role: UserRoles.SUPER_ADMIN });
    return users;
  }
  // ################################## UserJobs ###############################
  async addStoreId(userId: string, storeId: string): Promise<string> {
    const res = await this._userRepo.addStoreId(userId, storeId);
    return res;
  }
  // ################################## UserCron ###############################
  async removeNotVerifiedUsers(): Promise<void> {
    // Remove not verified users
  }
  async removeNotVerifiedUsersMobile(): Promise<number> {
    const user = await this._userRepo.removeNotVerifiedUsersMobile();
    return user;
  }
}
