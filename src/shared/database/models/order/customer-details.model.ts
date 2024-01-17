import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ _id: false })
export class CustomerDetailsModel {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "UserAddressModel",
  })
  address_id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country_code: string;

  @Prop({ required: true })
  mobile_number: string;

  @Prop({ default: null })
  additional_info: string | null;
}
