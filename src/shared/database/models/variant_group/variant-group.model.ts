import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ collection: "variantGroupCollection", timestamps: true })
export class VariantGroupModel extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: true })
  status: true;

  //Foreign keys
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;
}
export const VariantGroupSchema =
  SchemaFactory.createForClass(VariantGroupModel);
