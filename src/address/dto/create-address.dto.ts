import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { AddressType } from "src/shared/database/models/address/enums/address-type.enum";
import { LocationDto } from "./location.dto";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({})
  postal_code: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  mobile: string;

  @IsNotEmpty()
  @ApiProperty({})
  address_type: AddressType;

  @IsOptional()
  @Type(() => LocationDto)
  @ApiProperty({})
  location?: LocationDto;

  @IsString()
  @IsOptional()
  @ApiProperty({})
  flat_no?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({})
  building_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({})
  landmark?: string;
}
