import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { CustomerDetailsModel } from "src/shared/database/models/order/customer-details.model";
import { OrderStatus } from "src/shared/database/models/order/enums/order-status.enum";
import { PaymentMode } from "src/shared/database/models/order/enums/payment-mode.enum";
import { DeliveryType } from "src/shared/database/models/store/enums/delivery-type.enum";
import { PaymentStatus } from "twilio/lib/rest/api/v2010/account/call/payment";

export class Order {
  @ApiProperty()
  serial_number: string;

  @ApiProperty()
  customer_details: CustomerDetailsModel;

  @ApiProperty()
  delivery_type: DeliveryType;

  @ApiProperty()
  order_status: OrderStatus;

  @ApiProperty()
  payment_mode: PaymentMode;

  @ApiProperty()
  payment_status: PaymentStatus;

  @ApiProperty()
  sub_total: number;

  @ApiProperty()
  coupon_code: string | null;

  @ApiProperty()
  coupon_discount: number;

  @ApiProperty()
  deal_discount: number;

  @ApiProperty()
  total_discount: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  delivery_charges: number;

  @ApiProperty()
  tip: number;

  @ApiProperty()
  grand_total: number;

  @ApiProperty()
  amount_paid: number;

  @ApiProperty()
  amount_paid_in_parts: number[] | [];

  @ApiProperty()
  currency_code: string;

  @ApiProperty()
  currency_symbol: string;

  @ApiProperty()
  is_assigned: boolean;

  @ApiProperty()
  order_assigned_on: Date | null;

  @ApiProperty()
  is_accepted_by_delivery_partner: boolean;

  //Foreign keys
  @ApiProperty()
  cart_id: Types.ObjectId;

  @ApiProperty()
  partner_id: Types.ObjectId | null;

  @ApiProperty()
  coupon_id: Types.ObjectId | null;

  @ApiProperty()
  store_id: Types.ObjectId;

  @ApiProperty()
  user_id: Types.ObjectId;
}
