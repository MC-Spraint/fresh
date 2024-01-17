import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as mongoose from "mongoose";
import { EnvVariables } from "../config/env-variables.enum";

export const MONGO_DB = "MONGO_DB";
export type MongoInstance = mongoose.Connection;

export const MONGO_PROVIDERS = [
  {
    provide: MONGO_DB,
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<mongoose.Connection> => {
      const logger = new Logger(MONGO_DB);
      const env = configService.get<string>(EnvVariables.NODE_ENV) as string;
      const mongoUri = configService.get<string>(
        EnvVariables.DATABASE_URI,
      ) as string;
      if (!mongoUri) {
        logger.error(`${EnvVariables.DATABASE_URI} Is Missing`);
      }
      const db = mongoose.createConnection(mongoUri);
      logger.log(`MongoInstance successfully initialized in ${env}`);
      return db;
    },
  },
];
