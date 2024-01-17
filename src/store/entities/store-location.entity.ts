import { ApiProperty } from "@nestjs/swagger";

export class StoreLocation {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}
