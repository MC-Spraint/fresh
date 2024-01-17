import { Module } from "@nestjs/common";
import { DealService } from "./deal.service";
import { DealController } from "./deal.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  DealModel,
  DealSchema,
} from "src/shared/database/models/deal/deal.model";
import { DealRepository } from "./deal.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DealModel.name, schema: DealSchema }]),
  ],
  controllers: [DealController],
  providers: [DealRepository, DealService, DealRepository],
})
export class DealModule {}
