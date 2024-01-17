import { Controller } from "@nestjs/common";
import { FavoriteStoreService } from "./favorite_store.service";
//TODO: Create an API to add store as favorite
//TODO: Create an API to add store as unfavorite
//TODO: Create an API to get favorite stores
@Controller("favorite-store")
export class FavoriteStoreController {
  constructor(private readonly favoriteStoreService: FavoriteStoreService) {}
}
