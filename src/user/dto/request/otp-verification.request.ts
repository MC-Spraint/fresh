import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OTPVerificationRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
