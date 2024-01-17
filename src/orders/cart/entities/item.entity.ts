import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class Item {
  @ApiProperty()
  is_deal_available: boolean;

  @ApiProperty()
  deal_amount: number;

  @ApiProperty()
  deal_percent: number;

  @ApiProperty()
  item_price: number;

  @ApiProperty()
  item_quantity: number;

  @ApiProperty()
  sub_total: number;

  @ApiProperty()
  deal_discount: number;

  @ApiProperty()
  grand_total: number;

  @ApiProperty()
  is_a_variant: boolean;

  @ApiProperty()
  variant_id: Types.ObjectId | null;

  @ApiProperty()
  product_id: Types.ObjectId;
}
