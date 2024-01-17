import { Injectable } from "@nestjs/common";
import { CreateXxReq } from "./dto/create-xx.dto";
import { Xx } from "./entities/xx.entity";
import { XxModel } from "./xx.model";
import { XxRepo } from "./xx.repo";

@Injectable()
export class XxService {
  constructor(private xxRepo: XxRepo) {}
  async create(createXxDto: CreateXxReq): Promise<Xx> {
    const res = await this.xxRepo.createAndSave(createXxDto);
    return res;
  }

  async findAll(): Promise<XxModel[]> {
    const entity = await this.xxRepo.findAll();
    return entity;
  }

  async delete(): Promise<any> {
    const entity = await this.xxRepo.delete({});
    return entity;
  }

  async test(): Promise<any> {
    const entity = await this.xxRepo.test();
    return entity;
  }
}
