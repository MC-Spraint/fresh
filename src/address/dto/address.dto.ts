import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AddressType } from "src/shared/database/models/address/enums/address-type.enum";
import { LocationDto } from "./location.dto";

export class AddressDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  postal_code: number;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({})
  @IsNotEmpty()
  address_type: AddressType;

  @ApiProperty({})
  @Type(() => LocationDto)
  @IsOptional()
  location?: LocationDto;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  flat_no?: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  building_name?: string;

  @ApiProperty({})
  @IsString()
  @IsOptional()
  landmark?: string;

  @ApiProperty({})
  createdAt: Date;

  @ApiProperty({})
  updatedAt: Date;

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  distanceInMeter?: number;
}
