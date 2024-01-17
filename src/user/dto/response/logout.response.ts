import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";

export class LogoutResponse extends CommonResponse {
  @ApiProperty({})
  data: boolean;
}
