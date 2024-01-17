import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Product } from "../../entities/product.entity";
export class ProductResponse extends CommonResponse {
  @ApiProperty({})
  public data: Product;
}
