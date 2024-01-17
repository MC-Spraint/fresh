import { PartialType } from "@nestjs/swagger";
import { CreateAddOnCategoryDto } from "./create-add-on-category.dto";

export class UpdateAddOnCategoryDto extends PartialType(
  CreateAddOnCategoryDto,
) {}
