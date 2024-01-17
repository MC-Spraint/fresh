import { ApiProperty } from "@nestjs/swagger";
export class StoreAddress {
  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  postal_code: string;
}
