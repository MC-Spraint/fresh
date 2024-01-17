import { ApiProperty } from "@nestjs/swagger";
import { Onboardings } from "./onboardings.dto";

export class VerifyOTP extends Onboardings {
  @ApiProperty()
  isNewUser: boolean;
}
