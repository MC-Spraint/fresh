import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { AddressType } from "src/shared/database/models/address/enums/address-type.enum";
import { AddressLocation } from "./address-location.entity";

export class Address {
  @ApiProperty()
  address: string;

  @ApiProperty()
  postal_code: number;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  address_type: AddressType;

  @ApiProperty()
  location: AddressLocation;

  @ApiProperty()
  flat_no: string | null;

  @ApiProperty()
  building_name: string | null;

  @ApiProperty()
  landmark: string | null;

  @ApiProperty()
  is_default: boolean;

  // Relations
  @ApiProperty()
  user_id: Types.ObjectId;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
