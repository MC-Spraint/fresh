import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, APP_FILTER } from "@nestjs/core";
import { MulterModule } from "@nestjs/platform-express";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "../auth/auth.module";
import { GlobalExceptionsFilter } from "../exception_filter/globalException.filter";
import { bullQueueOptions } from "./bull-queue.provider";
import configOptions from "./config";
import throttlerOptions from "./throttler.config";

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    ThrottlerModule.forRootAsync(throttlerOptions),
    MulterModule.register({}),
    BullModule.forRootAsync(bullQueueOptions),
    AuthModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
  exports: [ConfigService],
})
export class AppConfigModule {}
