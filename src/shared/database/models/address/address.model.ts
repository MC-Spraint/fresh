import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { AddressLocationModel } from "./address-location.model";
import { AddressType } from "./enums/address-type.enum";

@Schema({ collection: "addressCollection", timestamps: true })
export class AddressModel extends Document {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  postal_code: number;

  @Prop({ required: true, type: String })
  mobile: string;

  @Prop({ required: true, enum: Object.keys(AddressType) })
  address_type: AddressType;

  @Prop({ type: AddressLocationModel })
  location: AddressLocationModel;

  @Prop({ default: null })
  flat_no: string | null;

  @Prop({ default: null })
  building_name: string | null;

  @Prop({ default: null })
  landmark: string | null;

  @Prop({ default: false })
  is_default: boolean;

  // Relations
  @Prop({
    required: true,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: "UserModel",
  })
  user_id: Types.ObjectId;
}
export const AddressSchema = SchemaFactory.createForClass(AddressModel).index({
  location: "2dsphere",
});
