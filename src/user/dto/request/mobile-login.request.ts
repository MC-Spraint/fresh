import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class MobileLoginRequest {
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
