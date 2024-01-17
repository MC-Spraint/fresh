import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CartStatus } from "./enums/cart-status.enum";
import { ItemModel } from "./item.model";

@Schema({ collection: "cartCollection", timestamps: true })
export class CartModel extends Document {
  @Prop({ required: true })
  products: ItemModel[];

  @Prop({ required: true })
  sub_total: number;

  @Prop({ default: 0 })
  deal_discount: number;

  @Prop({ required: true })
  grand_total: number;

  @Prop({ required: true })
  total_quantity: number;

  @Prop({ required: true, enum: Object.values(CartStatus) })
  cart_status: CartStatus;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "StoreModel",
  })
  store_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "UserModel",
  })
  user_id: Types.ObjectId;
}
export const CartSchema = SchemaFactory.createForClass(CartModel);
