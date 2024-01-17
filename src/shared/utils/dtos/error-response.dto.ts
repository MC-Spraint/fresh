import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "../../shared/dto/common-response";

export class ErrorResponseDto extends CommonResponse {
  @ApiProperty({})
  error: string;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  path: string;

  @ApiProperty({})
  method: string;
}
