import { Module } from "@nestjs/common";
import { StoreReviewService } from "./store_review.service";
import { StoreReviewController } from "./store_review.controller";

@Module({
  controllers: [StoreReviewController],
  providers: [StoreReviewService],
})
export class StoreReviewModule {}
