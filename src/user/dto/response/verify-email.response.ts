import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";

export class VerifyEmailResponse extends CommonResponse {
  @ApiProperty({})
  data: string;
}
