import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./category.controller";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { AuthModule } from "src/shared/auth/auth.module";
import { UtilService } from "src/shared/utils/util.service";
import {
  CategoryModel,
  CategorySchema,
} from "src/shared/database/models/category/category.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
    AuthModule,
  ],
  providers: [UtilService, CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
