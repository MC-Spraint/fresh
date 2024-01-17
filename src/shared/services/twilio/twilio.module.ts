import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TwilioProviders } from "./twilio.providers";
import { TwilioService } from "./twilio.service";

@Module({
  imports: [ConfigModule],
  providers: [...TwilioProviders, TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
