import { Injectable } from "@nestjs/common";
import { CreateAddOnCategoryDto } from "./dto/create-add-on-category.dto";
import { UpdateAddOnCategoryDto } from "./dto/update-add-on-category.dto";

@Injectable()
export class AddOnCategoryService {
  create(createAddOnCategoryDto: CreateAddOnCategoryDto) {
    return "This action adds a new addOnCategory";
  }

  findAll() {
    return `This action returns all addOnCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addOnCategory`;
  }

  update(id: number, updateAddOnCategoryDto: UpdateAddOnCategoryDto) {
    return `This action updates a #${id} addOnCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} addOnCategory`;
  }
}
