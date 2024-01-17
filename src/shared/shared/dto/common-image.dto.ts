import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CommonImageDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  file_url: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  file_id: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  file_path: string;
}
