import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Rating } from "src/shared/shared/enums/rating.enum";

@Schema({ collection: "productReviewCollection", timestamps: true })
export class ProductReviewModel extends Document {
  @Prop({ required: true })
  rating: Rating;

  @Prop({ required: true })
  review: string;

  @Prop({ default: true })
  status: boolean;

  //Foreign keys
  @Prop({ required: false, type: SchemaTypes.ObjectId, ref: "ProductModel" })
  product_id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: "UserModel" })
  user_id: Types.ObjectId;
}
export const ProductReviewSchema =
  SchemaFactory.createForClass(ProductReviewModel);
