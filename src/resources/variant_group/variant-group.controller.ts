import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VariantGroupService } from "./variant-group.service";
import { CreateVariantGroupDto } from "./dto/create-variant-group.dto";
import { UpdateVariantGroupDto } from "./dto/update-variant-group.dto";

@Controller("product/variant-group")
export class VariantGroupController {
  constructor(private readonly variantGroupService: VariantGroupService) {}

  //TODO: add API to create variant-group(Admin only)
}
