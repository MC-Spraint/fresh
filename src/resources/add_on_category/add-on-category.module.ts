import { Module } from "@nestjs/common";
import { AddOnCategoryService } from "./add-on-category.service";
import { AddOnCategoryController } from "./add-on-category.controller";
@Module({
  controllers: [AddOnCategoryController],
  providers: [AddOnCategoryService],
})
export class AddOnCategoryModule {}
