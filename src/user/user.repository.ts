import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/shared/auth/auth.service";
import { UserModel } from "src/shared/database/models/user/user.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { User } from "./entity/user.entity";

@Injectable()
export class UserRepository extends MongooseRepository<UserModel, User> {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
    private readonly _authService: AuthService,
  ) {
    super(userModel);
  }

  public async getUserById(user_id: string): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      _id: user_id,
    });
    return user;
  }

  public async updateUserById(user_id: string, data: unknown): Promise<User> {
    try {
      const user: User = await this.userModel.findOneAndUpdate(
        { _id: user_id },
        data,
        { new: true },
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
  public async getNotVerifiedUserById(user_id: string): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      _id: user_id,
      is_verified: false,
    });
    return user;
  }
  public async getMobileNotVerifiedUserById(
    user_id: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      _id: user_id,
      is_mobile_verified: false,
    });
    return user;
  }
  public async getEmailNotVerifiedUserById(
    user_id: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      _id: user_id,
      is_email_verified: false,
    });
    return user;
  }

  public async getUserByMobileNumber(
    country_code: string,
    mobile: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      country_code: country_code,
      mobile: mobile,
    });
    return user;
  }
  public async getEmailVerifiedUserByEmail(
    email: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      email: email,
      is_email_verified: true,
    });
    return user;
  }
  public async getMobileVerifiedUserByEmail(
    email: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      email: email,
      is_mobile_verified: true,
    });
    return user;
  }
  public async getEmailNotVerifiedUserByEmail(
    email: string,
  ): Promise<User | null> {
    const user: User = await this.userModel.findOne({
      email: email,
      is_email_verified: false,
    });
    return user;
  }

  public async updateUserEmailAsVerified(
    user_id: string,
    token: string,
  ): Promise<User> {
    try {
      const user: User = await this.userModel.findOneAndUpdate(
        { _id: user_id, email_verification_token: token },
        {
          email_verification_token: null,
          is_email_verified: true,
          is_verified: true,
        },
        { new: true },
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
  public async setUsersForgotPasswordtoken(
    email: string,
    token: string,
  ): Promise<User> {
    try {
      const user: User = await this.userModel.findOneAndUpdate(
        { email: email, is_verified: true },
        { forgot_password_token: token },
        { new: true },
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
  public async resetPassword(
    user_id: string,
    forgotPasswordToken: string,
    hashedPassword: string,
  ): Promise<User> {
    try {
      const user: User = await this.userModel.findOneAndUpdate(
        {
          _id: user_id,
          forgot_password_token: forgotPasswordToken,
          is_verified: true,
        },
        { password: hashedPassword, forgot_password_token: null },
        { new: true },
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
  async addStoreId(userId: string, storeId: string): Promise<string> {
    try {
      const { _id } = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { store_id: storeId },
        { new: true, projection: { _id: true } },
      );
      return _id;
    } catch (err) {
      throw err;
    }
  }

  //#########################CRONS#################################
  public async removeNotVerifiedUsersMobile(): Promise<number> {
    const users = await this.userModel.updateMany(
      {
        country_code: { $ne: null },
        mobile: { $ne: null },
        is_mobile_verified: false,
      },
      { $set: { country_code: null, mobile: null } },
    );
    return users.modifiedCount;
  }
}
