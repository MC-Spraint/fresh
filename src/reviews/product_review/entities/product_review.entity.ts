import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Rating } from "src/shared/shared/enums/rating.enum";

export class ProductReview {
  @ApiProperty()
  rating: Rating;

  @ApiProperty()
  review: string;

  @ApiProperty()
  status: boolean;

  //Foreign keys
  @ApiProperty()
  product_id: Types.ObjectId;

  @ApiProperty()
  user_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
