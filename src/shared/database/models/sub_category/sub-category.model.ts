import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "subCategoryCollection", timestamps: true })
export class SubCategoryModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: false })
  category_name: string;

  @Prop({ required: false, default: true })
  status: true;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "CategoryModel" })
  category_id: Types.ObjectId;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategoryModel);
