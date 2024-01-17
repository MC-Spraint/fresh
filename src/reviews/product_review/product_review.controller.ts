import { Controller } from "@nestjs/common";
import { ProductReviewService } from "./product_review.service";

@Controller("product-review")
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}
}
