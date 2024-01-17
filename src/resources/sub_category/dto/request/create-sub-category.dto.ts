import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { CommonImageDto } from "src/shared/shared/dto/common-image.dto";

export class CreateSubCategoryDto {
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
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  category_id: Types.ObjectId;

  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  store_id?: Types.ObjectId;
}
