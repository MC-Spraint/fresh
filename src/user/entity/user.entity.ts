import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class User {
  @ApiProperty({ type: String })
  name: string | null;

  @ApiProperty({ type: String })
  email: string | null;

  @ApiProperty({ type: String })
  password: string | null;

  @ApiProperty({ type: String })
  role: string | null;

  @ApiProperty({ type: String })
  country_code: string | null;

  @ApiProperty({ type: String })
  mobile: string | null;

  @ApiProperty({ type: String })
  verification_otp_secret: string | null;

  @ApiProperty({ type: String })
  refresh_token: string | null;

  @ApiProperty({ type: String })
  email_verification_token: string | null;

  @ApiProperty({ type: String })
  forgot_password_token: string | null;

  @ApiProperty({ type: String })
  is_email_verified: boolean;

  @ApiProperty({ type: String })
  is_mobile_verified: boolean;

  @ApiProperty({ type: String })
  is_verified: boolean;

  //Relations
  @ApiProperty({ type: String })
  store_id: Types.ObjectId | null;

  @ApiProperty({ type: String })
  partner_id: Types.ObjectId | null;

  //Common fields
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
