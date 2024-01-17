import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String, description: "password" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String, description: "repeatPassword" })
  repeatPassword: string;
}
