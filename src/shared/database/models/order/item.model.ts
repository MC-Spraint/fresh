import { Schema, Prop } from "@nestjs/mongoose";
import { Max, Min } from "class-validator";
import { SchemaTypes, Types } from "mongoose";

@Schema({ _id: false })
export class ItemModel {
  @Prop({ required: false, default: false })
  is_deal_available: boolean;

  @Prop({ default: 0 })
  deal_amount: number;

  @Max(100)
  @Min(1)
  @Prop({ default: 0 })
  deal_percent: number;

  @Prop({ required: true })
  item_price: number;

  @Prop({ required: true })
  item_quantity: number;

  @Prop({ required: true })
  sub_total: string;

  @Prop({ default: 0 })
  deal_discount: number;

  @Prop({ required: true })
  grand_total: string;

  @Prop({ default: false })
  is_a_variant: boolean;

  @Prop({
    default: null,
    type: SchemaTypes.ObjectId,
    ref: "VariantModel",
  })
  variant_id: Types.ObjectId | null;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "ProductModel",
  })
  product_id: Types.ObjectId;
}
