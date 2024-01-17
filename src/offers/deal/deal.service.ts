import { Injectable } from "@nestjs/common";
import { DealRepository } from "./deal.repository";
import { Types } from "mongoose";
import { Deal } from "./entities/deal.entity";
import { AddDealRequest } from "./dto/request/add-deal.request";
@Injectable()
export class DealService {
  constructor(private readonly _dealRepository: DealRepository) {}

  async addDeal(
    store_id: Types.ObjectId,
    deal: AddDealRequest,
  ): Promise<Partial<Deal>> {
    //TODO: add validation
    const updateDeal = { store_id, ...deal };
    return await this._dealRepository.createAndSave(updateDeal);
  }
}
