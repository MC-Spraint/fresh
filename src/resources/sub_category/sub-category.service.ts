import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSubCategoryDto } from "./dto/request/create-sub-category.dto";
import { Types } from "mongoose";
import { SubCategoryRepository } from "./sub-category.repository";
import { CategoryRepository } from "../category/category.repository";
import { SubCategory } from "./entities/sub-category.entity";
@Injectable()
export class SubCategoryService {
  constructor(
    private readonly _subCategoryRepo: SubCategoryRepository,
    private readonly _categoryRepo: CategoryRepository,
  ) {}
  async createSubCategory(
    store_id: Types.ObjectId,
    createSubCategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const userCategory = await this._categoryRepo.count({
      store_id: store_id,
      _id: createSubCategory.category_id,
    });
    if (!userCategory) throw new NotFoundException("Not found category_id");
    const subCategory = { store_id, ...createSubCategory };
    return await this._subCategoryRepo.createAndSave(subCategory);
  }
}
