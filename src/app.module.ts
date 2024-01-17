import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./shared/auth/auth.module";
import { EmailService } from "./shared/services/email/email.service";
import { UtilService } from "./shared/utils/util.service";
import { UserModule } from "./user/user.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { StripeService } from "./shared/services/payment/stripe.service";

import { CouponModule } from "./offers/coupon/coupon.module";
import { DealModule } from "./offers/deal/deal.module";
import { FavoriteProductModule } from "./favorites/favorite_product/favorite_product.module";
import { FavoriteStoreModule } from "./favorites/favorite_store/favorite_store.module";
import { AddOnCategoryModule } from "./resources/add_on_category/add-on-category.module";
import { AddOnProductModule } from "./resources/add_on_product/add-on-product.module";
import { BannerModule } from "./resources/banner/banner.module";
import { CategoryModule } from "./resources/category/category.module";
import { ProductModule } from "./resources/product/product.module";
import { SubCategoryModule } from "./resources/sub_category/sub-category.module";
import { VariantModule } from "./resources/variant/variant.module";
import { VariantGroupModule } from "./resources/variant_group/variant-group.module";
import { StoreModule } from "./store/store.module";
// import { ProductReviewModule } from "./reviews/product_review/product_review.module";
import { StoreReviewModule } from "./reviews/store_review/store_review.module";
import { XxModule } from "./xx/xx.module";
import { OneSignalService } from "./shared/services/push_notification/one-signal.service";
import { SharedModule } from "./shared/shared.module";
import { UploadModule } from "./upload/upload.module";
import { CartModule } from "./orders/cart/cart.module";
import { OrderModule } from "./orders/order/order.module";
import { OrderStatusHistoryModule } from "./orders/order_status_history/order-statu-history.module";
import { TransactionHistoryModule } from "./orders/transaction_history/transaction-history.module";
import { DeliveryPartnerModule } from "./delivery_partner/delivery-partner.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SharedModule,
    AuthModule,
    UserModule,
    StoreModule,
    // ProductReviewModule,
    StoreReviewModule,
    ProductModule,
    CategoryModule,
    SubCategoryModule,
    VariantModule,
    VariantGroupModule,
    AddOnCategoryModule,
    AddOnProductModule,
    BannerModule,
    CouponModule,
    DealModule,
    FavoriteProductModule,
    FavoriteStoreModule,
    XxModule,
    UploadModule,
    CartModule,
    OrderModule,
    OrderStatusHistoryModule,
    TransactionHistoryModule,
    DeliveryPartnerModule,
  ],
  controllers: [AppController],
  providers: [
    OneSignalService,
    AppService,
    Logger,
    EmailService,
    UtilService,
    StripeService,
  ],
  exports: [EmailService],
})
export class AppModule {}
