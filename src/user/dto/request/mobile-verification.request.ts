import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class MobileVerificationRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
