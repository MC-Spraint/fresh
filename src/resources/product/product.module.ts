import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";

import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../category/category.repository";
import {
  CategoryModel,
  CategorySchema,
} from "src/shared/database/models/category/category.model";
import {
  ProductModel,
  ProductSchema,
} from "src/shared/database/models/product/product.model";
import {
  SubCategoryModel,
  SubCategorySchema,
} from "src/shared/database/models/sub_category/sub-category.model";
import { SubCategoryRepository } from "../sub_category/sub-category.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: SubCategoryModel.name, schema: SubCategorySchema },
    ]),
  ],
  providers: [
    ProductService,
    ProductRepository,
    CategoryRepository,
    SubCategoryRepository,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
