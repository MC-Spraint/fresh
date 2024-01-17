import { ConfigService, ConfigModule } from "@nestjs/config";
import { EnvVariables } from "../config/env-variables.enum";

export const DATABASE_PROVIDERS = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<ConfigModule> => ({
    uri: configService.get<string>(EnvVariables.DATABASE_URI) as string,
  }),
  inject: [ConfigService],
};
