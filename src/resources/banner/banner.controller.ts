import { Controller } from "@nestjs/common";
import { BannerService } from "./banner.service";

@Controller("store/banner")
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
}
