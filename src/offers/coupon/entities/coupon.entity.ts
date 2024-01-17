import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CouponFor } from "../enum/coupon-for.enum";
import { CouponType } from "../enum/coupon-type.enum";
export class Coupon {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  coupon_code: string;

  @ApiProperty()
  coupon_type: CouponType;

  @ApiProperty()
  coupon_for: CouponFor;

  @ApiProperty()
  discount_value: number;

  @ApiProperty()
  minimum_order_amount: number;

  @ApiProperty()
  start_date: number;

  @ApiProperty()
  expiry_date: number;

  @ApiProperty()
  status: true;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  category_id: Types.ObjectId | null;

  @ApiProperty()
  sub_category_id: Types.ObjectId | null;

  @ApiProperty()
  product_id: Types.ObjectId | null;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
