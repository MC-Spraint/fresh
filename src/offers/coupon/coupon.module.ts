import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/shared/auth/auth.module";
import { CouponRepository } from "./coupon.repository";
import { CouponService } from "./coupon.service";
import { CouponController } from "./coupon.controller";
import {
  CouponModel,
  CouponSchema,
} from "src/shared/database/models/coupon/coupon.model";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: CouponModel.name, schema: CouponSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponRepository, CouponService],
})
export class CouponModule {}
