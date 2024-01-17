import { Injectable } from "@nestjs/common";
import { CreateAddOnProductDto } from "./dto/create-add-on-product.dto";
import { UpdateAddOnProductDto } from "./dto/update-add-on-product.dto";

@Injectable()
export class AddOnProductService {
  create(createAddOnProductDto: CreateAddOnProductDto) {
    return "This action adds a new addOnProduct";
  }

  findAll() {
    return `This action returns all addOnProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addOnProduct`;
  }

  update(id: number, updateAddOnProductDto: UpdateAddOnProductDto) {
    return `This action updates a #${id} addOnProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} addOnProduct`;
  }
}
