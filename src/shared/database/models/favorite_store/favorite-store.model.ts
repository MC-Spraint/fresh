import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({ collection: "favouriteStoreCollection", timestamps: true })
export class FavoriteStoreModel extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "UserModel" })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;
}
export const FavouriteStoreSchema =
  SchemaFactory.createForClass(FavoriteStoreModel);
