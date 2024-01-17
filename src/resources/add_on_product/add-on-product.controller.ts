import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AddOnProductService } from "./add-on-product.service";
import { CreateAddOnProductDto } from "./dto/create-add-on-product.dto";
import { UpdateAddOnProductDto } from "./dto/update-add-on-product.dto";

@Controller("product/add-on-product")
export class AddOnProductController {
  constructor(private readonly addOnProductService: AddOnProductService) {}
}
