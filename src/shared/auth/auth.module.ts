import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import jwtOptions from "./jwt.config";
import { AuthJwtStrategy } from "./auth.jwt.strategy";
import { OneSignalService } from "../services/push_notification/one-signal.service";
@Module({
  imports: [JwtModule.registerAsync(jwtOptions)],
  controllers: [],
  providers: [OneSignalService, AuthService, AuthJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
