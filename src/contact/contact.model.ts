import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "contactCollection", timestamps: true })
export class ContactModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}
export const contactSchema = SchemaFactory.createForClass(ContactModel);
