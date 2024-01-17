import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class FavouriteProduct {
  @ApiProperty()
  user_id: Types.ObjectId;

  @ApiProperty()
  product_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
