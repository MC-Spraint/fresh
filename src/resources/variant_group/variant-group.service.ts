import { Injectable } from "@nestjs/common";
import { CreateVariantGroupDto } from "./dto/create-variant-group.dto";
import { UpdateVariantGroupDto } from "./dto/update-variant-group.dto";

@Injectable()
export class VariantGroupService {
  create(createVariantGroupDto: CreateVariantGroupDto) {
    return "This action adds a new variantGroup";
  }

  findAll() {
    return `This action returns all variantGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantGroup`;
  }

  update(id: number, updateVariantGroupDto: UpdateVariantGroupDto) {
    return `This action updates a #${id} variantGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantGroup`;
  }
}
