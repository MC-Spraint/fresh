import { Module } from "@nestjs/common";
import { AddOnProductService } from "./add-on-product.service";
import { AddOnProductController } from "./add-on-product.controller";

@Module({
  controllers: [AddOnProductController],
  providers: [AddOnProductService],
})
export class AddOnProductModule {}
