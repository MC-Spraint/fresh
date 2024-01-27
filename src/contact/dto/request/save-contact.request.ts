import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SaveContactRequest {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({})
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  message: string;
}
