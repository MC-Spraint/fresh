import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { BannerType } from "src/shared/database/models/banner/enums/banner-type.enum";
import { CommonImage } from "src/shared/database/models/common-image.model";

export class Banner {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: CommonImage;

  @ApiProperty()
  banner_type: BannerType;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  category_name: string;

  @ApiProperty()
  status: boolean;

  //Foreign keys
  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  product_id: Types.ObjectId | null;

  @ApiProperty()
  category_id: Types.ObjectId | null;

  //Common fields
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
