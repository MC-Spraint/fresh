import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { LogInUserDto } from "./dto/request/login-user.request";
import { RefreshTokenDto } from "./dto/request/refresh-token.request";
import { Public } from "src/shared/auth/decorators/public.decorator";
import { UtilService } from "src/shared/utils/util.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetUser } from "src/shared/auth/decorators/get-user.decorator";
import { AuthGuard } from "../shared/auth/guards/auth.guard";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { RolesGuard } from "src/shared/auth/guards/roles.guard";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import { SuccessResponse } from "src/shared/utils/dtos/success-response.enum";
import { SignupUserDto } from "./dto/request/signup-user.request";
import { ResetPasswordDto } from "./dto/request/reset-password.request";
import { UpdatePasswordDto } from "./dto/request/update-password.request";
import { UpdateName } from "./dto/request/update-name.request";
import { LoginResponse } from "./dto/response/login.response";
import { LogoutResponse } from "./dto/response/logout.response";
import { ForgotPasswordResponse } from "./dto/response/forgot-password.response";
import { VerifyForgotPasswordDto } from "./dto/verify-forgot-password.dto";
import { UpdateUserResponse } from "./dto/response/update-user.response";
import { UpdateRoleDto } from "./dto/request/update-role.request";
import { User } from "./entity/user.entity";
import { ForgotPassword } from "./dto/request/forgot-password.request";
import { ResendVeriFicationEmailResponse } from "./dto/response/resend-verification-email.response";
import { RequestResendVeriFicationEmail } from "./dto/request/request-resend-verification-email.request";
import { Onboardings } from "./dto/onboardings.dto";
import { SignupEmailResponse } from "./dto/response/signup-email.response";
import { VerifyEmailResponse } from "./dto/response/verify-email.response";
import { MailResponse } from "./dto/mail-response.dto";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
import { MobileLoginRequest } from "./dto/request/mobile-login.request";
import { MobileLoginResponse } from "./dto/response/mobile-login.response";
import { Types } from "mongoose";
import { OTPVerificationResponse } from "./dto/response/verify-otp.response";
import { OTPVerificationRequest } from "./dto/request/otp-verification.request";
import { UpdateMobile } from "./dto/request/update-mobile.request";
import { MobileVerificationRequest } from "./dto/request/mobile-verification.request";

@ApiTags("Module user")
@Controller("/user")
export class UserController {
  public token: number;
  public host: string;
  public protocol: string;
  public user: User;
  constructor(
    private readonly _userService: UserService,
    private readonly _util: UtilService,
  ) {}

  @ApiBody({ type: MobileLoginRequest })
  @ApiOperation({ description: "Send a OTP to users mobile" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "An OTP has been sent to your mobile number",
    type: MobileLoginResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/mobile-login")
  async mobileLogin(
    @Res() res: Response,
    @Body() body: MobileLoginRequest,
  ): Promise<Response<MobileLoginResponse>> {
    const { _id } = await this._userService.mobileLogin(body);
    const resObj = this._util.successResponse<{ _id: Types.ObjectId }>(
      SuccessResponse.CREATED,
      "An OTP has been sent to your mobile number",
      { _id: _id },
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBody({ type: OTPVerificationRequest })
  @ApiOperation({ description: "Verifies OTP and sends onboardings" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "OTP verified successfully",
    type: OTPVerificationResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Incorrect OTP",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "OTP Is Already Used",
    type: CommonErrorResponseDto,
  })
  @Post("/verify-otp-login")
  async verifyOTP(
    @Res() res: Response,
    @Body() body: OTPVerificationRequest,
  ): Promise<Response<OTPVerificationResponse>> {
    const resp = await this._userService.verifyOTP(body);
    const resObj = this._util.successResponse<{ _id: Types.ObjectId }>(
      SuccessResponse.CREATED,
      "OTP verified successfully",
      resp,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBody({ type: SignupUserDto })
  @ApiOperation({ description: "Send a signup verification email" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "A verification link has been sent to your email",
    type: SignupEmailResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/signup")
  async signUpEmail(
    @Res() res: Response,
    @Req() req: Request,
    @Body() user: SignupUserDto,
  ): Promise<Response<SignupEmailResponse>> {
    const hostName: string = req.get("host");
    const protName: string = req.protocol;
    const resp = await this._userService.signUpUser(user, hostName, protName);
    const resObj = this._util.successResponse<MailResponse | string>(
      SuccessResponse.CREATED,
      "A verification link has been sent to your email",
      resp,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBody({ type: RequestResendVeriFicationEmail })
  @ApiOperation({ description: "Resend a signup verification email" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "We have resent you a verification link in email",
    type: SignupEmailResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/resend-verification-email")
  async ResendVeriFicationEmailRes(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { user_id }: RequestResendVeriFicationEmail,
  ): Promise<Response<ResendVeriFicationEmailResponse>> {
    const hostName: string = req.get("host");
    const protName: string = req.protocol;
    const resp = await this._userService.resendVerificationLink(
      user_id,
      protName,
      hostName,
    );
    const newLocal = "We have resent you a verification link in email";
    const resObj = this._util.successResponse<MailResponse | string>(
      SuccessResponse.OK,
      newLocal,
      resp,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiOperation({ description: "Verify signup email" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Email is verified successfully",
    type: VerifyEmailResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Get("/:id/verify-signup-email")
  @Public()
  async verify(
    @Res() res: Response,
    @Param("id") id: string,
    @Query("token") token: string,
  ): Promise<Response<VerifyEmailResponse>> {
    const verifiedUser: string = await this._userService.verify(id, token);
    const resObj = this._util.successResponse<string>(
      SuccessResponse.OK,
      "Email is verified successfully",
      verifiedUser,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBody({ type: LogInUserDto })
  @ApiOperation({ description: "Login the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logged in successfully",
    type: LoginResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/login")
  async logIn(
    @Res() res: Response,
    @Body() user: LogInUserDto,
  ): Promise<Response<LoginResponse>> {
    const loginRes = await this._userService.logIn(user);
    const resObj = this._util.successResponse<Onboardings>(
      SuccessResponse.OK,
      "Logged in successfully",
      loginRes,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiOperation({ description: "Send tokens to the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Tokens sent",
    type: Onboardings,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/get-tokens")
  async sendTokens(
    @Res() res: Response,
    @Body() refresh_token: RefreshTokenDto,
  ): Promise<Response<Onboardings>> {
    const refreshTokenRes = await this._userService.sendTokens(
      refresh_token.refresh_token.toString(),
    );
    const resObj = this._util.successResponse<Onboardings>(
      SuccessResponse.OK,
      "Tokens sent",
      refreshTokenRes,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Logout the user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Logged out successfully!",
    type: LogoutResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/logout")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async logOut(
    @Res() res: Response,
    @GetUser() user: User,
  ): Promise<Response<LogoutResponse>> {
    const logoutRes = await this._userService.logout(String(user._id));
    const resObj = this._util.successResponse<boolean>(
      SuccessResponse.OK,
      "Logged out successfully!",
      logoutRes,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiOperation({ description: "Forgot password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "A verification link has been sent to your email",
    type: ForgotPasswordResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/forgot-password")
  async forgotPassword(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: ForgotPassword,
  ): Promise<Response<ForgotPasswordResponse>> {
    const hostName: string = req.get("host");
    const protName: string = req.protocol;
    const resp: MailResponse = await this._userService.forgotPassword(
      body.email,
      hostName,
      protName,
    );
    const resObj = this._util.successResponse<MailResponse>(
      SuccessResponse.OK,
      "A verification link has been sent to your email",
      resp,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiOperation({ description: "Verify forgot password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Email is verified successfully",
    type: VerifyForgotPasswordDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Get("/verify-forgot-password")
  @Render("reset-pass")
  @Public()
  async verifyForgotPassword(
    @Query("id") id: string,
    @Query("token") token: string,
  ): Promise<VerifyForgotPasswordDto> {
    await this._userService.verifyForgotPassword(id, token);
    return {
      message: "Email is verified successfully",
      id: id,
      token: token,
    };
  }

  @ApiBody({ type: ResetPasswordDto })
  @ApiOperation({ description: "Reset password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Password has been changed successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/reset-password")
  @Render("success")
  @Public()
  async resetPassword(
    @Body() resetPass: ResetPasswordDto,
    @Query("id") id: string,
    @Query("token") token: string,
  ): Promise<{ message: string }> {
    if (resetPass.password === resetPass.repeatPassword) {
      await this._userService.resetPassword(id, token, resetPass.password);
      return {
        message: "Password has been changed successfully",
      };
    } else {
      throw new BadRequestException("Enter passwords correctly");
    }
  }

  @ApiBearerAuth("Authorization")
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOperation({ description: "Update password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Password updated successfully",
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/password/update")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async updatePassword(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updatePass: UpdatePasswordDto,
  ): Promise<Response<UpdateUserResponse>> {
    const { _id } = user;
    const updatedUser = await this._userService.updatePassword(
      String(_id),
      updatePass.password,
    );
    const resObj = this._util.successResponse<User>(
      SuccessResponse.OK,
      "Password updated successfully",
      updatedUser,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiBody({ type: UpdateName })
  @ApiOperation({ description: "Update name" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Name updated successfully",
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/name/update")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async updateName(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updateName: UpdateName,
  ): Promise<Response<UpdateUserResponse>> {
    const { _id } = user;
    const updatedUser = await this._userService.updateName(
      String(_id),
      updateName.name,
    );
    const resObj = this._util.successResponse<User>(
      SuccessResponse.OK,
      "Name updated successfully",
      updatedUser,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiBody({ type: UpdateMobile })
  @ApiOperation({ description: "Update mobile number" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "An OTP has been sent to the mobile",
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("/mobile/update")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async updateMobile(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updateMobile: UpdateMobile,
  ): Promise<Response<UpdateUserResponse>> {
    const { _id } = user;
    const updatedUser = await this._userService.updateMobile(
      String(_id),
      updateMobile,
    );
    const resObj = this._util.successResponse<Partial<User>>(
      SuccessResponse.OK,
      "An OTP has been sent to the mobile",
      updatedUser,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiBody({ type: MobileVerificationRequest })
  @ApiOperation({ description: "Checks OTP and verifies mobile" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Mobile number is verified successfully",
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Incorrect OTP",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "OTP Is Already Used",
    type: CommonErrorResponseDto,
  })
  @Patch("/verify-mobile")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async verifyMobile(
    @GetUser() { _id }: User,
    @Res() res: Response,
    @Body() body: MobileVerificationRequest,
  ): Promise<Response<UpdateUserResponse>> {
    const resp = await this._userService.verifyMobile({
      user_id: String(_id),
      ...body,
    });
    const resObj = this._util.successResponse<Partial<User>>(
      SuccessResponse.CREATED,
      "Mobile number is verified successfully",
      resp,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Update role" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Role updated successfully",
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Patch("super-admin/role/update/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.SUPER_ADMIN)
  async updateRole(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updateRole: UpdateRoleDto,
    @Param("id") id: string,
  ): Promise<Response<UpdateUserResponse>> {
    const { _id: super_admin_id } = user;
    const updatedUser = await this._userService.updateRole(
      String(super_admin_id),
      id,
      updateRole,
    );
    const resObj = this._util.successResponse<User>(
      SuccessResponse.OK,
      "Role updated successfully",
      updatedUser,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }
}
