import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LogInUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "email" })
  email_or_mobile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "passwprd" })
  password: string;
}
