import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CommonImage } from "src/shared/database/models/common-image.model";

export class Variant {
  @ApiProperty()
  title: string;

  @ApiProperty()
  descrption: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  price: number;

  @ApiProperty()
  is_out_of_stock: boolean;

  @ApiProperty()
  status: true;

  //Foreign keys

  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  variant_group_id: Types.ObjectId;

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
