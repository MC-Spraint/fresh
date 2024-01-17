import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String, description: "password" })
  password: string;
}
