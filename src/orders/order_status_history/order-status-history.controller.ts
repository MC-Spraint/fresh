import { Controller } from "@nestjs/common";
import { OrderStatusHistoryService } from "./order-status-history.service";

@Controller("order-status-history")
export class OrderStatusHistoryController {
  constructor(
    private readonly orderStatusHistoryService: OrderStatusHistoryService,
  ) {}
}
