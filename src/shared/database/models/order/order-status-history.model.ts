import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { OrderStatus } from "./enums/order-status.enum";

@Schema({ collection: "orderStatusHistoryCollection", timestamps: true })
export class OrderStatusHistoryModel {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "OrderModel" })
  order_id: Types.ObjectId;

  @Prop({ default: OrderStatus.ORDER_PLACED })
  order_status: OrderStatus;
}
export const OrderStatusHistorySchema = SchemaFactory.createForClass(
  OrderStatusHistoryModel,
);
