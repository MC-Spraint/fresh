import { Injectable, Logger } from "@nestjs/common";
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private logger = new Logger(MongooseConfigService.name);
  createMongooseOptions(): MongooseModuleOptions {
    this.logger.log(`Connecting to database............`);
    return {
      uri: process.env.DATABASE_URI as string,
    };
  }
}
