import { Controller } from "@nestjs/common";
import { DeliveryPartnerService } from "./delivery-partner.service";

@Controller("delivery-partner")
export class DeliveryPartnerController {
  constructor(
    private readonly deliveryPartnerService: DeliveryPartnerService,
  ) {}
}
