import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsMongoId,
} from "class-validator";
import { Types } from "mongoose";
import { CommonImageDto } from "src/shared/shared/dto/common-image.dto";
import { DealFor } from "../../enums/deal-for.enum";

export class AddDealRequest {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({})
  @ValidateNested()
  @Type(() => CommonImageDto)
  @IsNotEmpty()
  image: CommonImageDto;

  @ApiProperty({ enum: Object.keys(DealFor) })
  @IsString()
  @IsNotEmpty()
  @IsEnum(DealFor, {
    message: "Deal type must be one of these " + Object.keys(DealFor),
  })
  deal_for: DealFor;

  @ApiProperty({})
  @Min(0)
  @Max(100)
  @IsNumber()
  @IsNotEmpty()
  discount_in_percent: number;

  //Foreign key

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  category_id: Types.ObjectId | null;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  sub_category_id: Types.ObjectId | null;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  product_id: Types.ObjectId | null;
}
