import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepository } from "src/resources/product/product.repository";
import {
  CartModel,
  CartSchema,
} from "src/shared/database/models/order/cart.model";
import {
  ProductModel,
  ProductSchema,
} from "src/shared/database/models/product/product.model";
import { CartController } from "./cart.controller";
import { CartRepository } from "./cart.repository";
import { CartService } from "./cart.service";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartModel.name, schema: CartSchema }]),
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService, ProductRepository],
})
export class CartModule {}
