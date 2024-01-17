import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class SignupUserDto {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String, description: "name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ type: String, description: "password" })
  password: string;
}
