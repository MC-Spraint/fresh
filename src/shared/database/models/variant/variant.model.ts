import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { CommonImage } from "../common-image.model";

@Schema({ collection: "variantCollection", timestamps: true })
export class VariantModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false, default: false })
  is_out_of_stock: boolean;

  @Prop({ required: false, default: true })
  status: true;

  // Relations
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: "VariantGroupModel",
  })
  variant_group_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "ProductModel" })
  product_id: Types.ObjectId;
}
export const VariantSchema = SchemaFactory.createForClass(VariantModel);
