import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { SignupUserDto } from "./signup-user.request";

export class SaveUserDto extends SignupUserDto {
  constructor(
    name: string,
    email: string,
    password: string,
    email_verification_token: string,
  ) {
    super(name, email, password);
    this.email_verification_token = email_verification_token;
  }
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "email_verification_token" })
  email_verification_token: string;
}
