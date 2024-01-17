import { ApiProperty } from "@nestjs/swagger";
import { ImageDto } from "src/shared/shared/dto/image.dto";
import { Types } from "mongoose";
import { StoreAddress } from "./store-address.entity";
import { StoreLocation } from "./store-location.entity";
import { StoreWorkingHours } from "./store-working-hours.entity";
import { DeliveryType } from "src/shared/database/models/store/enums/delivery-type.enum";
import { PaymentType } from "src/shared/database/models/store/enums/payment-type.enum";
import { ShippingType } from "src/shared/database/models/store/enums/shipping-type.enum";
import { StoreType } from "src/shared/database/models/store/enums/store-type.enum";
import { TaxType } from "src/shared/database/models/store/enums/tax-type.enum";

export class Store {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: ImageDto;

  @ApiProperty()
  store_code: string;

  @ApiProperty()
  contact_no1: string;

  @ApiProperty()
  contact_no2: string;

  @ApiProperty()
  contact_email: string;

  @ApiProperty()
  currency_code: string;

  @ApiProperty()
  currency_symbol: string;

  @ApiProperty()
  store_address: StoreAddress;

  @ApiProperty()
  store_location: StoreLocation;

  @ApiProperty()
  working_hours: StoreWorkingHours[];

  @ApiProperty()
  store_type: StoreType;

  @ApiProperty()
  payment_type: PaymentType;

  @ApiProperty()
  shipping_type: ShippingType;

  @ApiProperty()
  delivery_type: DeliveryType;

  @ApiProperty()
  tax_type: TaxType;

  @ApiProperty()
  tax_name: string;

  @ApiProperty()
  tax_amount: number;

  @ApiProperty()
  mininum_order_amount: number;

  @ApiProperty()
  total_ratings: number;

  @ApiProperty()
  total_number_of_people_rated: number;

  @ApiProperty()
  business_commissions: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  delivery_charge_per_km?: number;

  @ApiProperty()
  delivery_coverage_in_km?: number;

  @ApiProperty()
  fix_delivery_charge?: number;

  @ApiProperty()
  mininum_order_amount_for_free_delivery?: number;

  //Foreign keys
  @ApiProperty()
  managers?: Types.ObjectId[];

  @ApiProperty()
  vendor_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
