import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false, timestamps: false })
export class StoreTimingsModel {
  @Prop({ required: true, type: String })
  slot: string;

  @Prop({ required: true, type: String })
  open_time: string;

  @Prop({ required: true, type: String })
  close_time: string;
}
