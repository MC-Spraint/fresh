import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { MailResponse } from "../mail-response.dto";

export class ResendVeriFicationEmailResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => MailResponse)
  data: MailResponse;
}
