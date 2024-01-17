import { ApiProperty } from "@nestjs/swagger";
import { DealFor } from "../enums/deal-for.enum";
import { Types } from "mongoose";
import { CommonImage } from "src/shared/database/models/common-image.model";

export class Deal {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  deal_for: DealFor;

  @ApiProperty()
  discount_in_percent: number;

  @ApiProperty()
  status: true;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  category_id: Types.ObjectId | null;

  @ApiProperty()
  sub_category_id: Types.ObjectId | null;

  @ApiProperty()
  product_id: Types.ObjectId | null;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
