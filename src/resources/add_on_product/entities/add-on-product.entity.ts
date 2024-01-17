import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CommonImage } from "src/shared/database/models/common-image.model";

export class AddOnCategory {
  @ApiProperty()
  title: string;

  @ApiProperty()
  descrption: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  price: number;

  @ApiProperty()
  store_name: string;

  @ApiProperty()
  add_on_category_title: string;

  @ApiProperty()
  is_out_of_stock: boolean;

  @ApiProperty()
  status: true;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  add_on_category_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
