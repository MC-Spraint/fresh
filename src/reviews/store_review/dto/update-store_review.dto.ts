import { PartialType } from '@nestjs/swagger';
import { CreateStoreReviewDto } from './create-store_review.dto';

export class UpdateStoreReviewDto extends PartialType(CreateStoreReviewDto) {}
