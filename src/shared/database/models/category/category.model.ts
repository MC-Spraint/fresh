import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "categoryCollection", timestamps: true })
export class CategoryModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: false, default: true })
  status: boolean;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;
}
export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
