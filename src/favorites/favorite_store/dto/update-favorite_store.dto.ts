import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteStoreDto } from './create-favorite_store.dto';

export class UpdateFavoriteStoreDto extends PartialType(CreateFavoriteStoreDto) {}
