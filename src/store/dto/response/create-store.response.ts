import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Store } from "../../entities/store.entity";

export class CreateStoreResponse extends CommonResponse {
  @ApiProperty({})
  public data: Store;
}
