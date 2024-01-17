import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/shared/auth/auth.service";
import { CouponModel } from "src/shared/database/models/coupon/coupon.model";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { Coupon } from "./entities/coupon.entity";

@Injectable()
export class CouponRepository extends MongooseRepository<CouponModel, Coupon> {
  constructor(
    @InjectModel(CouponModel.name)
    private couponModel: Model<CouponModel>,
    private readonly _authService: AuthService,
  ) {
    super(couponModel);
  }
}
