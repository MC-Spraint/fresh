import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CommonImageDto } from "src/shared/shared/dto/common-image.dto";

export class SubCategory {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: CommonImageDto;

  @ApiProperty()
  category_name: string;

  @ApiProperty()
  status: boolean;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  category_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
