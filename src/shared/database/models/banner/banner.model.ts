import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";
import { BannerType } from "./enums/banner-type.enum";

@Schema({ collection: "bannerCollection", timestamps: true })
export class BannerModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true })
  banner_type: BannerType;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  category_name: string;

  @Prop({ required: false, default: true })
  status: boolean;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "ProductModel", default: null })
  product_id: Types.ObjectId | null;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "CategoryModel",
    default: null,
  })
  category_id: Types.ObjectId | null;
}
export const BannerSchema = SchemaFactory.createForClass(BannerModel);
