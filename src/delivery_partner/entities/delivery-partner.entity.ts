import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";

export class DeliveryPartner {
  @ApiProperty({ type: String, description: "name" })
  name: string | null;

  @ApiProperty({ type: String, description: "email" })
  email: string | null;

  @ApiProperty({ type: String, description: "password" })
  password: string | null;

  @ApiProperty({ type: String, description: "role" })
  role: UserRoles.DELIVERY_PARTNER;

  @ApiProperty({ type: String, description: "country_code" })
  country_code: string | null;

  @ApiProperty({ type: String, description: "mobile" })
  mobile: string | null;

  @ApiProperty({ type: String, description: "verification_otp" })
  verification_otp: number | null;

  @ApiProperty({ type: String, description: "refresh_token" })
  refresh_token: string | null;

  @ApiProperty({ type: String, description: "email_verification_token" })
  email_verification_token: string | null;

  @ApiProperty({ type: String, description: "forgot_password_token" })
  forgot_password_token: string | null;

  @ApiProperty({ type: Boolean, description: "is_email_verified" })
  is_email_verified: boolean;

  @ApiProperty({ type: Boolean, description: "is_mobile_verified" })
  is_mobile_verified: boolean;

  @ApiProperty({ type: Boolean, description: "is_verified" })
  is_verified: boolean;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
