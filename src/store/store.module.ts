import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StoreRepository } from "./store.repository";

import { UtilService } from "src/shared/utils/util.service";
import { AuthModule } from "src/shared/auth/auth.module";
import { StoreEmitter } from "./background-jobs/store.emitter";
import {
  StoreModel,
  StoreSchema,
} from "src/shared/database/models/store/store.model";
import {
  UserModel,
  UserSchema,
} from "src/shared/database/models/user/user.model";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: StoreModel.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),

    AuthModule,
  ],
  providers: [UtilService, StoreService, StoreRepository, StoreEmitter],
  controllers: [StoreController],
})
export class StoreModule {}
