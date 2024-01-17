import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Onboardings } from "../onboardings.dto";

export class LoginResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Onboardings)
  data: Onboardings;
}
