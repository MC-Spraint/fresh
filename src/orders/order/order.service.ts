import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {
  // private lastOrderNumber = 0;
  // private lastOrderLetter = "A";
  // private async generateOrderId(): Promise<string> {
  //   const orderIds = await this.ordersRepo.getOrderIds();
  //   const lastOrderCount = orderIds?.count ?? 0;
  //   this.lastOrderLetter = String.fromCharCode((lastOrderCount % 26) + 65);
  //   this.lastOrderNumber = Math.floor(lastOrderCount / 26);

  //   const orderNumber = this.lastOrderNumber.toString().padStart(7, "0");
  //   const orderLetter = this.lastOrderLetter;
  //   this.lastOrderLetter = String.fromCharCode(
  //     this.lastOrderLetter.charCodeAt(0) + 1,
  //   );
  //   const orderId = `#${orderNumber}${orderLetter}`;
  //   await this.ordersRepo.saveOrderIds(lastOrderCount + 1);
  //   return orderId;
  // }
}
