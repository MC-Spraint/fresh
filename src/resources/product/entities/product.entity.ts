import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CommonImage } from "src/shared/database/models/common-image.model";

export class Product {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  price: number;

  @ApiProperty()
  is_out_of_stock: boolean;

  @ApiProperty()
  total_ratings: number;

  @ApiProperty()
  total_number_of_people_rated: number;

  @ApiProperty()
  status: boolean;

  // Relations
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  category_id: Types.ObjectId;

  @ApiProperty()
  sub_category_id: Types.ObjectId;

  @ApiProperty({})
  variant_id: Types.ObjectId | null;

  @ApiProperty({})
  variant_group_id: Types.ObjectId | null;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
