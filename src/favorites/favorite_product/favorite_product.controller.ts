import { Controller } from "@nestjs/common";
import { FavoriteProductService } from "./favorite_product.service";
//TODO: Create an API to add product as favorite
//TODO: Create an API to add product as unfavorite
//TODO: Create an API to get favorite products
@Controller("favorite-product")
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}
}
