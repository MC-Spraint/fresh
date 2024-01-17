import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { DeliveryType } from "../store/enums/delivery-type.enum";
import { CustomerDetailsModel } from "./customer-details.model";
import { OrderStatus } from "./enums/order-status.enum";
import { PaymentMode } from "./enums/payment-mode.enum";
import { PaymentStatus } from "./enums/payment-status.enum";
//TODO: Need to work om

@Schema({ collection: "orderCollection", timestamps: true })
export class OrderModel extends Document {
  @Prop({ required: true })
  serial_number: string;

  @Prop({ required: true, type: CustomerDetailsModel })
  customer_details: CustomerDetailsModel;

  @Prop({ enum: Object.values(DeliveryType), default: DeliveryType.FIXED })
  delivery_type: DeliveryType;

  @Prop({ enum: Object.values(OrderStatus), default: OrderStatus.ORDER_PLACED })
  order_status: OrderStatus;

  @Prop({ required: true, enum: Object.values(PaymentMode) })
  payment_mode: PaymentMode;

  @Prop({ enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING })
  payment_status: PaymentStatus;

  @Prop({ required: true })
  sub_total: number;

  @Prop({ drequired: true })
  coupon_code: string | null;

  @Prop({ default: 0 })
  coupon_discount: number;

  @Prop({ default: 0 })
  deal_discount: number;

  @Prop({ default: 0 })
  total_discount: number;

  @Prop({ default: 0 })
  delivery_charges: number;

  @Prop({ default: 0 })
  tax: number;

  @Prop({ default: 0 })
  tip: number;

  @Prop({ default: 0 })
  grand_total: number;

  @Prop({ default: 0 })
  amount_paid: number;

  @Prop({ required: false, type: [Number], default: [] })
  amount_paid_in_parts: number[] | [];

  @Prop({ default: "USD" })
  currency_code: string;

  @Prop({ default: "$" })
  currency_symbol: string;

  @Prop({ default: false })
  is_assigned: boolean;

  @Prop({ type: Date, default: null })
  order_assigned_on: Date | null;

  @Prop({ default: false })
  is_accepted_by_delivery_partner: boolean;

  //Foreign keys
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "CartModel" })
  cart_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "UserModel", default: null })
  partner_id: Types.ObjectId | null;

  @Prop({ type: SchemaTypes.ObjectId, ref: "CouponModel", default: null })
  coupon_id: Types.ObjectId | null;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "UserModel" })
  user_id: Types.ObjectId;
}
export const OrderSchema = SchemaFactory.createForClass(OrderModel);
