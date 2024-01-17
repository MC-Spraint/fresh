import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false })
export class AddressLocationModel {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: [Number] })
  coordinates: number[];
}
