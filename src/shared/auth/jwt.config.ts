import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvVariables } from "./../config/env-variables.enum";
const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    secret: config.get<string>(EnvVariables.ACCESS_TOKEN_SECRET),
    signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  }),
  inject: [ConfigService],
};
export default jwtOptions;
