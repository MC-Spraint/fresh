import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OneSignalService } from "./one-signal.service";

@Module({
  imports: [ConfigModule],
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule {}
