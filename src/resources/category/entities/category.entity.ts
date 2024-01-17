import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CommonImage } from "src/shared/database/models/common-image.model";
export class Category {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  status: boolean;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
