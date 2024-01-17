import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryRequest } from "./dto/request/create-category.request";
import { Types } from "mongoose";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {
  constructor(private readonly _categoryRepo: CategoryRepository) {}
  async createCategory(
    store_id: Types.ObjectId,
    createCategory: CreateCategoryRequest,
  ): Promise<Category> {
    const category = { store_id, ...createCategory };
    return await this._categoryRepo.createAndSave(category);
  }

  async getListOfAllCategories(store_id: string): Promise<Category[]> {
    const list = await this._categoryRepo.find({ store_id: store_id });
    return list;
  }
}
