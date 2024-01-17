import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";

@Schema({ collection: "userCollection", timestamps: true })
export class UserModel extends Document {
  @Prop({ default: null })
  name: string | null;

  @Prop({ default: null, unique: false })
  email: string | null;

  @Prop({ default: null })
  password: string | null;

  @Prop({
    required: true,
    enum: Object.keys(UserRoles),
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Prop({ default: null })
  country_code: string | null;

  @Prop({ default: null })
  mobile: string | null;

  @Prop({ default: null })
  verification_otp_secret: string | null;

  @Prop({ default: null })
  refresh_token: string | null;

  @Prop({ default: null })
  email_verification_token: string | null;

  @Prop({ default: null })
  forgot_password_token: string | null;

  @Prop({ default: false })
  is_mobile_verified: boolean;

  @Prop({ default: false })
  is_email_verified: boolean;

  @Prop({ default: false })
  is_verified: boolean;

  // Relations
  @Prop({
    required: false,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: "StoreModel",
    default: null,
  })
  store_id: Types.ObjectId | null;

  @Prop({
    required: false,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: "DeliveryPartnerModel",
    default: null,
  })
  partner_id: Types.ObjectId | null;
}
export const UserSchema = SchemaFactory.createForClass(UserModel);
