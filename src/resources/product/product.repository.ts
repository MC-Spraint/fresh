import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductModel } from "src/shared/database/models/product/product.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductRepository extends MongooseRepository<
  ProductModel,
  Product
> {
  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductModel>,
  ) {
    super(productModel);
  }
}
