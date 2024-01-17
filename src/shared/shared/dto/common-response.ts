import { ApiProperty } from "@nestjs/swagger";
import { ErrorResponse } from "../../utils/dtos/error-response.enum";
import { SuccessResponseCode } from "../../utils/dtos/success-response-code.enum";
import { SuccessResponse } from "../../utils/dtos/success-response.enum";

export class CommonResponse {
  @ApiProperty({})
  status: string;

  @ApiProperty({})
  response_code: SuccessResponseCode;

  @ApiProperty({})
  response: SuccessResponse | ErrorResponse;

  @ApiProperty({})
  message: string;
}
