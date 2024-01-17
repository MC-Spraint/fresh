import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { VerifyOTP } from "../verify-otp.dto";

export class OTPVerificationResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => VerifyOTP)
  data: VerifyOTP;
}
