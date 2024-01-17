import { BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

export class ItemClass {
  is_deal_available = false;
  deal_amount = 0;
  deal_percent = 0;
  item_price: number;
  item_quantity: number;
  sub_total: number;
  deal_discount = 0;
  grand_total: number;
  is_a_variant = false;
  variant_id: Types.ObjectId | null = null;
  product_id: Types.ObjectId;

  constructor(
    product_id: Types.ObjectId,
    item_price: number,
    item_quantity: number,
    variant_id = null,
    deal = 0,
    isDealPercentage = false,
  ) {
    this.product_id = product_id;
    this.item_price = item_price;
    this.item_quantity = item_quantity;
    this.sub_total = item_price * item_quantity;
    this.grand_total = item_price * item_quantity;
    if (variant_id !== null) {
      this.is_a_variant = true;
      this.variant_id = variant_id;
    }
    if (deal !== 0) this.is_deal_available = true;
    if (isDealPercentage) {
      this.deal_percent = deal;
      this.deal_discount = (this.sub_total * deal) / 100;
      this.grand_total = this.sub_total - this.deal_discount;
      return this;
    }
    this.deal_amount = deal;
    this.deal_discount = deal;
    this.grand_total = this.sub_total + this.deal_discount;
    return this;
  }

  increaseQuantity(increase_by: number): boolean {
    this.item_quantity = this.item_quantity + increase_by;
    this.sub_total = this.item_price * this.item_quantity;
    if (this.deal_percent && !this.deal_amount) {
      this.deal_discount = (this.sub_total * this.deal_percent) / 100;
      this.grand_total = this.sub_total - this.deal_discount;
      return true;
    }
    this.deal_discount = this.deal_amount;
    this.grand_total = this.sub_total - this.deal_discount;
    return true;
  }

  decreaseQuantity(decrease_by: number): boolean {
    if (this.item_quantity - decrease_by < 0)
      throw new BadRequestException(`Not enough products`);
    if (this.item_quantity - decrease_by === 0) return false;
    this.item_quantity = this.item_quantity - decrease_by;
    this.sub_total = this.item_price * this.item_quantity;
    if (this.deal_percent && !this.deal_amount) {
      this.deal_discount = (this.sub_total * this.deal_percent) / 100;
      this.grand_total = this.sub_total - this.deal_discount;
      return true;
    }
    this.deal_discount = this.deal_amount;
    this.grand_total = this.sub_total - this.deal_discount;
    return true;
  }

  setDeal(deal: number, isDealPercent: boolean): ItemClass {
    if (!this.product_id)
      throw new BadRequestException(`You Can't Set Deal To An Empty Item`);
    this.is_deal_available = true;
    if (isDealPercent) {
      this.deal_percent = deal;
      this.deal_discount = (this.sub_total * this.deal_percent) / 100;
    } else {
      this.deal_amount = deal;
      this.deal_discount = this.deal_amount;
    }
    this.grand_total = this.sub_total - this.deal_discount;
    return this;
  }

  setVariant(variant_id: Types.ObjectId, price: number): ItemClass {
    if (!this.product_id)
      throw new BadRequestException(`You Can't Set Variant To An Empty Item`);
    this.is_a_variant = true;
    this.variant_id = variant_id;
    this.item_price = price;
    this.sub_total = this.item_price * this.item_quantity;
    if (this.is_deal_available)
      this.grand_total = this.sub_total - this.deal_discount;
    else this.grand_total = this.sub_total;
    return this;
  }
}
