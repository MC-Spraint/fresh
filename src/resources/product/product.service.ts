import { Injectable, NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CategoryRepository } from "../category/category.repository";
import { SubCategoryRepository } from "../sub_category/sub-category.repository";
import { CreateProductRequest } from "./dto/request/create-product.request";
import { Product } from "./entities/product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
  constructor(
    private readonly _productRepo: ProductRepository,
    private readonly _categoryRepo: CategoryRepository,
    private readonly _subCategoryRepo: SubCategoryRepository,
  ) {}
  async createProduct(
    store_id: Types.ObjectId,
    createProduct: CreateProductRequest,
  ): Promise<Product> {
    const userSubCategory = await this._subCategoryRepo.count({
      store_id: store_id,
      category_id: createProduct.category_id,
      _id: createProduct.sub_category_id,
    });
    if (!userSubCategory) throw new NotFoundException("Not found category_id");
    const product = { store_id, ...createProduct };
    return await this._productRepo.createAndSave(product);
  }
}
