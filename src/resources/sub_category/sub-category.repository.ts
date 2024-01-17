import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubCategoryModel } from "src/shared/database/models/sub_category/sub-category.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { SubCategory } from "./entities/sub-category.entity";

@Injectable()
export class SubCategoryRepository extends MongooseRepository<
  SubCategoryModel,
  SubCategory
> {
  constructor(
    @InjectModel(SubCategoryModel.name)
    private subCategoryModel: Model<SubCategoryModel>,
  ) {
    super(subCategoryModel);
  }
}
