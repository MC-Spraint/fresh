import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false, timestamps: false })
export class StoreLocationModel {
  @Prop({ type: String, default: "Point" })
  type: string;

  @Prop({ required: true, type: [Number] })
  coordinates: number[];
}
