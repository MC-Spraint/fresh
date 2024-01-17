import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class StoreTimingsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  slot: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  open_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  close_time: string;
}
