import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CouponFor } from "src/offers/coupon/enum/coupon-for.enum";
import { CouponType } from "src/offers/coupon/enum/coupon-type.enum";

@Schema({ collection: "couponCollection", timestamps: true })
export class CouponModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  coupon_code: string;

  @Prop({ required: true })
  coupon_type: CouponType;

  @Prop({ required: true })
  coupon_for: CouponFor;

  @Prop({ required: true })
  discount_value: number;

  @Prop({ required: true })
  minimum_order_amount: number;

  @Prop({ required: true })
  start_date: number;

  @Prop({ required: true })
  expiry_date: number;

  @Prop({ required: false, default: true })
  status: true;

  //Foreign keys
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "CategoryModel", default: null })
  category_id: Types.ObjectId | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: "SubCategoryModel", default: null })
  sub_category_id: Types.ObjectId | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: "ProductModel", default: null })
  product_id: Types.ObjectId | null;
}
export const CouponSchema = SchemaFactory.createForClass(CouponModel);
