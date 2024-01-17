import { Module } from '@nestjs/common';
import { FavoriteStoreService } from './favorite_store.service';
import { FavoriteStoreController } from './favorite_store.controller';

@Module({
  controllers: [FavoriteStoreController],
  providers: [FavoriteStoreService]
})
export class FavoriteStoreModule {}
