import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CartStatus } from "src/shared/database/models/order/enums/cart-status.enum";
import { Item } from "./item.entity";

export class Cart {
  @ApiProperty()
  products: Item[];

  @ApiProperty()
  sub_total: number;

  @ApiProperty()
  deal_discount: number;

  @ApiProperty()
  grand_total: number;

  @ApiProperty()
  total_quantity: number;

  @ApiProperty()
  cart_status: CartStatus;

  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  user_id: Types.ObjectId;

  //Common fields
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
