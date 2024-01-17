import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Rating } from "src/shared/shared/enums/rating.enum";

@Schema({ collection: "StoreReviewCollection", timestamps: true })
export class StoreReviewModel extends Document {
  @Prop({ required: true })
  rating: Rating;

  @Prop({ required: true })
  review: string;

  @Prop({ default: true })
  status: boolean;

  // Relations
  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: "StoreModel" })
  store_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "UserModel" })
  user_id: Types.ObjectId;
}
export const StoreReviewSchema = SchemaFactory.createForClass(StoreReviewModel);
