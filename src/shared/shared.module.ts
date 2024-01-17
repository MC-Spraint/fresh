import { Global, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module"
import { DatabaseModule } from "./database/database.module";
import { AppConfigModule } from "./config/app-config.module";
import { EmailModule } from "./services/email/email.module";
import { OneSignalModule } from "./services/push_notification/one-signal.module";
import { UtilModule } from "./utils/util.module";
import { TwilioModule } from "./services/twilio/twilio.module";

@Global()
@Module({
  imports: [
    AppConfigModule,
    UtilModule,
    AuthModule,
    OneSignalModule,
    EmailModule,
    DatabaseModule,
    TwilioModule,
  ],
  providers: [],
  exports: [UtilModule, AuthModule, DatabaseModule],
})
export class SharedModule {}
