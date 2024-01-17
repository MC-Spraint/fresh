import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false, timestamps: false })
export class StoreAddressModel {
  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  postal_code: string;
}
