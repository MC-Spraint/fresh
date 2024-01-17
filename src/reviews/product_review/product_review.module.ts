import { Module } from "@nestjs/common";
import { ProductReviewController } from "./product_review.controller";
import { ProductReviewService } from "./product_review.service";

@Module({
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
})
export class ProductReviewModule {}
