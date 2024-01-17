import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Types } from "mongoose";
import { ProductRepository } from "src/resources/product/product.repository";
import { CartStatus } from "src/shared/database/models/order/enums/cart-status.enum";
import { CartRepository } from "./cart.repository";
import { CartClass } from "./classes/cart.class";
import { Cart } from "./entities/cart.entity";
@Injectable()
export class CartService {
  constructor(
    private readonly _cartRepo: CartRepository,
    private readonly _productRepo: ProductRepository,
  ) {}
  public async requestAddToCart(
    user_id: Types.ObjectId,
    product_id: Types.ObjectId,
  ): Promise<Partial<Cart> | null> {
    const product = await this._productRepo.findOne({
      _id: product_id,
    });
    if (!product) throw new NotFoundException(`Product Not Found`);
    //TODO: add deal if available
    const deal = 20;
    const isDealPercent = true;
    const existingCart = await this._cartRepo.findOne({
      user_id: user_id,
      cart_stauts: CartStatus.PENDING,
    });
    const newCart = new CartClass(user_id, product.store_id);
    if (!existingCart) {
      newCart.addProduct(
        product._id,
        product.price,
        1,
        product.variant_id,
        deal,
        isDealPercent,
      );
      const savedCart = await this._cartRepo.createAndSave(newCart);
      if (!savedCart) throw new BadRequestException(`Invalid Input`);
      return savedCart;
    }
    if (!product.store_id.equals(existingCart.store_id))
      throw new BadRequestException(
        "You Are Trying To Add A Product In Your Cart From " +
          "A Different Store Which Will Be Delivered By " +
          "A Different Delivery Partner, Plz Empty The Cart Or Place Order",
      );
    newCart.reinitializeCartFromDB(existingCart);
    newCart.addProduct(
      product._id,
      product.price,
      1,
      product.variant_id,
      deal,
      isDealPercent,
    );
    const updatedCart = await this._cartRepo.findOneAndUpdate(
      { _id: existingCart._id },
      newCart,
    );
    if (!updatedCart) throw new BadRequestException(`Invalid Input`);
    return updatedCart;
  }

  public async requestRemoveCartItem(
    user_id: Types.ObjectId,
    product_id: Types.ObjectId,
  ): Promise<Partial<Cart>> {
    const product = await this._productRepo.findOne({
      _id: product_id,
    });
    if (!product) throw new NotFoundException(`Product Not Found`);
    const cart = await this._cartRepo.findOne({
      user_id: user_id,
      store_id: product.store_id,
      cart_status: CartStatus.PENDING,
    });
    if (!cart) throw new NotFoundException(`Cart Not Found`);
    const newCart = new CartClass(user_id, product.store_id);
    newCart.reinitializeCartFromDB(cart);
    const item = newCart.products.find((product) =>
      product.product_id.equals(product_id),
    );
    if (!item) throw new NotFoundException(`Item Not Found In Cart`);

    newCart.removeProduct(product_id, item.item_quantity);
    if (!newCart.total_quantity) {
      const deleteCart = await this._cartRepo.delete({ _id: cart._id });
      if (!deleteCart) throw new Error(`Something Went Wrong`);
      return null;
    }
    const updatedCart = await this._cartRepo.findOneAndUpdate(
      { _id: cart._id },
      newCart,
    );
    if (!updatedCart) throw new BadRequestException(`Invalid Input`);
    return updatedCart;
  }

  public async requestIncreaseCartItem(
    user_id: Types.ObjectId,
    product_id: Types.ObjectId,
  ): Promise<Partial<Cart>> {
    const product = await this._productRepo.findOne({
      _id: product_id,
    });
    if (!product) throw new NotFoundException(`Product Not Found`);
    const cart = await this._cartRepo.findOne({
      user_id: user_id,
      store_id: product.store_id,
      cart_status: CartStatus.PENDING,
    });
    if (!cart) throw new NotFoundException(`Cart Not Found`);
    const newCart = new CartClass(user_id, product.store_id);
    newCart.reinitializeCartFromDB(cart);
    const item = newCart.products.find((product) =>
      product.product_id.equals(product_id),
    );
    if (!item) throw new NotFoundException(`Item Not Found In Cart`);
    newCart.increaseQuantityByOne(product_id);
    const updatedCart = await this._cartRepo.findOneAndUpdate(
      { _id: cart._id },
      newCart,
    );
    if (!updatedCart) throw new BadRequestException(`Invalid Input`);
    return updatedCart;
  }

  public async requestDecreaseCartItem(
    user_id: Types.ObjectId,
    product_id: Types.ObjectId,
  ): Promise<Partial<Cart>> {
    const product = await this._productRepo.findOne({
      _id: product_id,
    });
    if (!product) throw new NotFoundException(`Product Not Found`);
    const cart = await this._cartRepo.findOne({
      user_id: user_id,
      store_id: product.store_id,
      cart_status: CartStatus.PENDING,
    });
    if (!cart) throw new NotFoundException(`Cart Not Found`);
    const newCart = new CartClass(user_id, product.store_id);
    newCart.reinitializeCartFromDB(cart);
    const item = newCart.products.find((product) =>
      product.product_id.equals(product_id),
    );
    if (!item) throw new NotFoundException(`Item Not Found In Cart`);
    if (item.item_quantity <= 1) {
      throw new BadRequestException(`Item Quantity Must Be Greater Than 1`);
    }
    newCart.decreaseQuantityByOne(product_id);
    const updatedCart = await this._cartRepo.findOneAndUpdate(
      { _id: cart._id },
      newCart,
    );
    if (!updatedCart) throw new BadRequestException(`Invalid Input`);
    return updatedCart;
  }

  public async getCart(user_id: Types.ObjectId): Promise<Cart> {
    const cart = await this._cartRepo.findOne({
      user_id: user_id,
      cart_stauts: CartStatus.PENDING,
    });
    if (!cart) throw new NotFoundException(`Cart Is Empty`);
    return cart;
  }
}
