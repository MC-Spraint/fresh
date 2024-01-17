import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Types } from "mongoose";
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CommonImageDto } from "src/shared/shared/dto/common-image.dto";

export class CreateProductRequest {
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

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  category_id: Types.ObjectId;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  sub_category_id: Types.ObjectId;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  variant_id?: Types.ObjectId | null;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  variant_group_id?: Types.ObjectId | null;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  store_id?: Types.ObjectId;
}
