import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ collection: "addOnCategoryCollection", timestamps: true })
export class AddOnCategoryModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  status: boolean;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;
}
export const AddOnCategorySchema =
  SchemaFactory.createForClass(AddOnCategoryModel);
