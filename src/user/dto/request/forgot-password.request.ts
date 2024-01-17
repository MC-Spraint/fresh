import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ForgotPassword {
  @IsString()
  @ApiProperty({ type: String, description: "email" })
  email: string;
}
