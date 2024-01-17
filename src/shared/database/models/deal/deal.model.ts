import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Max, Min } from "class-validator";
import { Document, SchemaTypes, Types } from "mongoose";
import { DealFor } from "src/offers/deal/enums/deal-for.enum";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "dealCollection", timestamps: true })
export class DealModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true })
  deal_for: DealFor;

  @Max(100)
  @Min(1)
  @Prop({ required: true })
  discount_in_percent: number;

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
export const DealSchema = SchemaFactory.createForClass(DealModel);
