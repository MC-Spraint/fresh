import { Schema, Prop } from "@nestjs/mongoose";

@Schema({ _id: false, timestamps: false })
export class CommonImage {
  @Prop({ required: true, type: String })
  file_url: string;

  @Prop({ required: true, type: String })
  file_id: string;

  @Prop({ required: true, type: String })
  file_path: string;
}
