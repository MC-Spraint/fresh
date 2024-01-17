//TODO: 1. Create an API to get billDetailsAndVouchers
//TODO: 2. Create an API to place order
//TODO: 3. Create an API to get orderHistory
//TODO: 4. Create an API to get orderDetails
//TODO: 5. Create an API to get order status
//TODO: 6. Create an API to get cancel order
//TODO: 7. Create an API to get store/vendor dashboard(orders)
//TODO: 8. Create an API to assign order to rider
//TODO: 9. Create an API to change order status
//TODO:10. Create an API to show statistics for today, history, all***
import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
