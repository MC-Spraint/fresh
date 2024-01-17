import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "addOnProductCollection", timestamps: true })
export class AddOnProductModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  store_name: string;

  @Prop({ required: true })
  add_on_category_title: string;

  @Prop({ default: false })
  is_out_of_stock: boolean;

  @Prop({ default: true })
  status: boolean;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "AddOnCategoryModel",
  })
  add_on_category_id: Types.ObjectId;
}
export const AddOnProductSchema =
  SchemaFactory.createForClass(AddOnProductModel);
