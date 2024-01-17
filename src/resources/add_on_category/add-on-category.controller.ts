import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AddOnCategoryService } from "./add-on-category.service";
import { CreateAddOnCategoryDto } from "./dto/create-add-on-category.dto";
import { UpdateAddOnCategoryDto } from "./dto/update-add-on-category.dto";

@Controller("product/add-on-category")
export class AddOnCategoryController {
  constructor(private readonly addOnCategoryService: AddOnCategoryService) {}
}
