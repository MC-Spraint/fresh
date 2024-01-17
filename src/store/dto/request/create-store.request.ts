import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
} from "class-validator";
import { Types } from "mongoose";
import { StoreLocationDto } from "../store-location.dto";
import { StoreAddressDto } from "../store-address.dto";
import { ApiProperty } from "@nestjs/swagger";
import { DeliveryType } from "src/shared/database/models/store/enums/delivery-type.enum";
import { PaymentType } from "src/shared/database/models/store/enums/payment-type.enum";
import { ShippingType } from "src/shared/database/models/store/enums/shipping-type.enum";
import { StoreType } from "src/shared/database/models/store/enums/store-type.enum";
import { TaxType } from "src/shared/database/models/store/enums/tax-type.enum";
import { StoreWorkingHoursDto } from "../store-working-hours.dto";
import { CommonImageDto } from "src/shared/shared/dto/common-image.dto";

export class CreateStoreRequest {
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
  store_code: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  contact_no1: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  contact_no2: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  contact_email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  currency_code: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  currency_symbol: string;

  @ApiProperty({})
  @ValidateNested()
  @Type(() => StoreAddressDto)
  @IsNotEmpty()
  store_address: StoreAddressDto;

  @ApiProperty({})
  @ValidateNested()
  @Type(() => StoreLocationDto)
  @IsNotEmpty()
  store_location: StoreLocationDto;

  @ValidateNested({ each: true })
  @Type(() => StoreWorkingHoursDto)
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  working_hours: StoreWorkingHoursDto[];

  @ApiProperty({})
  @IsEnum(StoreType)
  @IsNotEmpty()
  store_type: StoreType;

  @ApiProperty({})
  @IsEnum(PaymentType)
  @IsNotEmpty()
  payment_type: PaymentType;

  @ApiProperty({})
  @IsEnum(ShippingType)
  @IsNotEmpty()
  shipping_type: ShippingType;

  @ApiProperty({})
  @IsEnum(DeliveryType)
  @IsNotEmpty()
  delivery_type: DeliveryType;

  @ApiProperty({})
  @IsEnum(TaxType)
  @IsNotEmpty()
  tax_type: TaxType;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  tax_name: string;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  tax_amount: number;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  mininum_order_amount: number;

  @ApiProperty()
  managers?: Types.ObjectId[];

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  delivery_charge_per_km?: number;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  delivery_coverage_in_km?: number;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fix_delivery_charge?: number;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mininum_order_amount_for_free_delivery?: number;
}
