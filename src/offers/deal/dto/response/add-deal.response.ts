import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Deal } from "../../entities/deal.entity";

export class AddDealResponse extends CommonResponse {
  @ApiProperty({})
  public data: Partial<Deal>;
}
