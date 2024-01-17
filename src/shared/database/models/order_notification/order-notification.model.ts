import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { OrderNotificationStatus } from "./enums/order-notification-status.enum";

@Schema({ collection: "orderNotificationCollection", timestamps: true })
export class OrderNotificationModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  notification_status: OrderNotificationStatus;

  @Prop({ required: true })
  delivery_boy_id: string;

  @Prop({ required: true })
  delivery_boy_name: string;

  @Prop({ required: false, default: false })
  isRead: false;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "StoreModel",
  })
  store_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "OrderModel",
  })
  order_id: Types.ObjectId;
}
export const OrderNotificationSchema = SchemaFactory.createForClass(
  OrderNotificationModel,
);
