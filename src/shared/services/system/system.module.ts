import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SystemService } from "./system.service";

@Module({
  imports: [ConfigModule],
  providers: [SystemService],
  exports: [SystemService],
})
export class TwilioModule {}
