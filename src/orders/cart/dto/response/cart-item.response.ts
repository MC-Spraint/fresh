import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Cart } from "../../entities/cart.entity";
export class CartItemResponse extends CommonResponse {
  @ApiProperty({})
  public data: Partial<Cart>;
}
