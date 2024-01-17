import { PartialType } from "@nestjs/swagger";
import { CreateAddOnProductDto } from "./create-add-on-product.dto";

export class UpdateAddOnProductDto extends PartialType(CreateAddOnProductDto) {}
