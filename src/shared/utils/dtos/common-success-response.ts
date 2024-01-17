import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "../../shared/dto/common-response";

export class commonSuccessResponse<T> extends CommonResponse {
  @ApiProperty({})
  data: T | null;
}
