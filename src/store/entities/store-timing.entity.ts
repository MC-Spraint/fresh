import { ApiProperty } from "@nestjs/swagger";

export class StoreTiming {
  @ApiProperty()
  slot: string;

  @ApiProperty()
  open_time: string;

  @ApiProperty()
  close_time: string;
}
