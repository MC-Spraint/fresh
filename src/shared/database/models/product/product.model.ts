import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "productCollection", timestamps: true })
export class ProductModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true })
  price: number;

  @Prop({ default: false })
  is_out_of_stock: boolean;

  @Prop({ type: Number, default: 0 })
  total_ratings: number;

  @Prop({ type: Number, default: 0 })
  total_number_of_people_rated: number;

  @Prop({ default: true })
  status: boolean;

  //Foreign keys
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "CategoryModel",
  })
  category_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "SubCategoryModel",
  })
  sub_category_id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: "VariantModel",
    default: null,
  })
  variant_id: Types.ObjectId | null;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: "VariantGroupModel",
    default: null,
  })
  variant_group_id: Types.ObjectId | null;
}
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
