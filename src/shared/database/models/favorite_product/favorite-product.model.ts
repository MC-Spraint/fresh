import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ collection: "favouriteProductCollection", timestamps: true })
export class FavoriteProductModel extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "UserModel" })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "ProductModel" })
  product_id: Types.ObjectId;
}
export const FavouriteProductSchema =
  SchemaFactory.createForClass(FavoriteProductModel);
