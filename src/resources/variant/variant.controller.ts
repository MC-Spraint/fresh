import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VariantService } from "./variant.service";
import { CreateVariantDto } from "./dto/create-variant.dto";
import { UpdateVariantDto } from "./dto/update-variant.dto";

@Controller("product/variant")
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  //TODO: add API to create variant(Admin only)
  //TODO: add API to list all variants by variant_group_id(Admin only)
}
