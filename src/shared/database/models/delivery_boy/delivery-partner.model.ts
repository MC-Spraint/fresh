import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { CommonImage } from "../common-image.model";
import { PartnerRegistrationRequest } from "./enums/partner-registration-request.enum";
import { Document } from "mongoose";

@Schema({ collection: "deliveryPartnerCollection", timestamps: true })
export class DeliveryPartnerModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  country_code: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  bank_account: object;

  @Prop({ required: true })
  pan_card: object;

  @Prop({ required: true })
  id_card: object;

  @Prop({ required: true })
  driving_liscence: object;

  @Prop({ required: true })
  education: object;

  @Prop({ required: true })
  familly: object;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: Number, default: 0 })
  total_ratings: number;

  @Prop({ type: Number, default: 0 })
  total_number_of_people_rated: number;

  @Prop({})
  is_registration_approved: PartnerRegistrationRequest;

  @Prop({ required: false })
  status: boolean;
}
export const DeliveryPartnerSchema =
  SchemaFactory.createForClass(DeliveryPartnerModel);
