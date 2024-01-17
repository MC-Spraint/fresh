import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DealModel } from "src/shared/database/models/deal/deal.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Deal } from "./entities/deal.entity";

@Injectable()
export class DealRepository extends MongooseRepository<DealModel, Deal> {
  constructor(
    @InjectModel(DealModel.name)
    private dealModel: Model<DealModel>,
  ) {
    super(dealModel);
  }
}
