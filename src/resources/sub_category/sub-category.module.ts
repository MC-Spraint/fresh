import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/shared/auth/auth.module";
import {
  CategoryModel,
  CategorySchema,
} from "src/shared/database/models/category/category.model";
import {
  SubCategoryModel,
  SubCategorySchema,
} from "src/shared/database/models/sub_category/sub-category.model";

import { UtilService } from "src/shared/utils/util.service";
import { CategoryModule } from "../category/category.module";
import { CategoryRepository } from "../category/category.repository";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryRepository } from "./sub-category.repository";
import { SubCategoryService } from "./sub-category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: SubCategoryModel.name, schema: SubCategorySchema },
    ]),
    forwardRef(() => CategoryModule),
    AuthModule,
  ],
  providers: [
    UtilService,
    SubCategoryService,
    SubCategoryRepository,
    CategoryRepository,
  ],
  controllers: [SubCategoryController],
})
export class SubCategoryModule {}
