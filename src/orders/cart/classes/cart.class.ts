import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CartStatus } from "src/shared/database/models/order/enums/cart-status.enum";
import { Cart } from "../entities/cart.entity";
import { ItemClass } from "./item.class";

export class CartClass {
  products: ItemClass[];
  sub_total: number;
  deal_discount: number;
  grand_total: number;
  total_quantity: number;
  cart_status: CartStatus = CartStatus.PENDING;
  user_id: Types.ObjectId;
  store_id: Types.ObjectId;

  constructor(user_id: Types.ObjectId, store_id: Types.ObjectId) {
    this.products = [];
    this.user_id = user_id;
    this.store_id = store_id;
    this.sub_total = 0;
    this.deal_discount = 0;
    this.grand_total = 0;
    this.total_quantity = 0;
  }

  addProduct(
    product_id: Types.ObjectId,
    item_price: number,
    item_quantity: number,
    variant_id = null,
    deal = 0,
    isDealPercentage = false,
  ): boolean {
    const found = this.products.find((p) => {
      return p.product_id.equals(product_id);
    });
    if (found) {
      found.increaseQuantity(item_quantity);
      found.setDeal(deal, isDealPercentage);
      if (variant_id !== null) found.setVariant(variant_id, item_price);
    } else {
      const item = new ItemClass(
        product_id,
        item_price,
        item_quantity,
        variant_id,
        deal,
        isDealPercentage,
      );
      this.products.push(item);
    }
    this.sub_total = this.products.reduce((acc, p) => (acc += p.sub_total), 0);
    this.deal_discount = this.products.reduce(
      (acc, p) => (acc += p.deal_discount),
      0,
    );
    this.total_quantity = this.products.reduce(
      (acc, p) => (acc += p.item_quantity),
      0,
    );
    this.grand_total = this.sub_total - this.deal_discount;
    return true;
  }

  public removeProduct(
    product_id: Types.ObjectId,
    item_quantity: number,
  ): boolean {
    const found = this.products.find((p) => p.product_id.equals(product_id));
    if (!found || !this.products)
      throw new NotFoundException(`Products not found`);
    const quantity = found.item_quantity;
    if (item_quantity > quantity)
      throw new BadRequestException(
        `Requested for ${
          item_quantity - quantity
        } more products than what exists`,
      );
    const deleted = found.decreaseQuantity(item_quantity);
    if (!deleted) {
      const index = this.products.indexOf(found);
      this.products.splice(index, 1);
    }
    this.sub_total = this.products.reduce((acc, p) => (acc += p.sub_total), 0);
    this.deal_discount = this.products.reduce(
      (acc, p) => (acc += p.deal_discount),
      0,
    );
    this.total_quantity = this.products.reduce(
      (acc, p) => (acc += p.item_quantity),
      0,
    );
    this.grand_total = this.sub_total - this.deal_discount;
    return true;
  }

  private increaseQuantity(
    product_id: Types.ObjectId,
    quantity: number,
  ): boolean {
    const found = this.products.find((p) => p.product_id.equals(product_id));
    if (!found) throw new NotFoundException(`Product Not Found`);
    found.increaseQuantity(quantity);
    this.sub_total = this.products.reduce((acc, p) => (acc += p.sub_total), 0);
    this.deal_discount = this.products.reduce(
      (acc, p) => (acc += p.deal_discount),
      0,
    );
    this.total_quantity = this.products.reduce(
      (acc, p) => (acc += p.item_quantity),
      0,
    );
    this.grand_total = this.sub_total - this.deal_discount;
    return true;
  }

  public increaseQuantityByOne(product_id: Types.ObjectId): boolean {
    return this.increaseQuantity(product_id, 1);
  }

  public decreaseQuantityByOne(product_id: Types.ObjectId): boolean {
    return this.removeProduct(product_id, 1);
  }

  public reinitializeCartFromDB(cart: Cart): CartClass {
    this.products = cart.products.map((product) => {
      const newItem = new ItemClass(
        product.product_id,
        product.item_price,
        product.item_quantity,
        product.variant_id,
        product.deal_amount || product.deal_percent,
        !!product.deal_percent,
      );
      return newItem;
    });
    this.sub_total = cart.sub_total;
    this.deal_discount = cart.deal_discount;
    this.grand_total = cart.grand_total;
    this.total_quantity = cart.total_quantity;
    this.user_id = cart.user_id;
    this.store_id = cart.store_id;
    return this;
  }
}
