import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CartModel } from "src/shared/database/models/order/cart.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Cart } from "./entities/cart.entity";

@Injectable()
export class CartRepository extends MongooseRepository<CartModel, Cart> {
  constructor(
    @InjectModel(CartModel.name)
    private cartModel: Model<CartModel>,
  ) {
    super(cartModel);
  }
}
