import { Controller } from "@nestjs/common";
import { StoreReviewService } from "./store_review.service";

@Controller("store-review")
export class StoreReviewController {
  constructor(private readonly storeReviewService: StoreReviewService) {}
}
