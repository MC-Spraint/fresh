import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Xx } from "./entities/xx.entity";
import { XxModel } from "./xx.model";

@Injectable()
export class XxRepo extends MongooseRepository<XxModel, Xx> {
  constructor(
    @InjectModel(XxModel.name)
    private xxModel: Model<XxModel>,
  ) {
    super(xxModel);
  }
  public async test(){
    // const xx = mongoose.model<XxDocument>("XxCollection");
    // const variable = await xx.findOne({ name: "Das" });
    const v = await this.xxModel.find();

    return v;
  }
  public async findAll() {
    return await this.xxModel.find();
  }
}
