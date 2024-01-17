import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class UpdateMobile {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country_code: string;

  @MaxLength(10)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;
}
