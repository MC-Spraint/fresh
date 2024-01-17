import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryModel } from "src/shared/database/models/category/category.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryRepository extends MongooseRepository<
  CategoryModel,
  Category
> {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
  ) {
    super(categoryModel);
  }
}
