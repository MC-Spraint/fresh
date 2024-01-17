import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_PROVIDERS } from "./database.provider";
import { MONGO_PROVIDERS } from "./mongo.providers";
@Module({
  imports: [MongooseModule.forRootAsync(DATABASE_PROVIDERS)],
  controllers: [],
  providers: [...MONGO_PROVIDERS],
  exports: [...MONGO_PROVIDERS],
})
export class DatabaseModule {}
