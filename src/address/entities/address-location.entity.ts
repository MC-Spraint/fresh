import { ApiProperty } from "@nestjs/swagger";

export class AddressLocation {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}
