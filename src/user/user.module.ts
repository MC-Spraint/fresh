import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserListener } from "./background-jobs/user.listener";
import { UserProcessor } from "./background-jobs/user.processor";
import { UserQueue } from "./background-jobs/user.queue";
import { registerUserQueue } from "./background-jobs/user-queue.config";
import { ScheduleModule } from "@nestjs/schedule";
import {
  UserModel,
  UserSchema,
} from "src/shared/database/models/user/user.model";
import { StoreModule } from "src/store/store.module";
import { EmailModule } from "src/shared/services/email/email.module";
import { TwilioModule } from "src/shared/services/twilio/twilio.module";
import { UserCron } from "./user.cron";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    ScheduleModule.forRoot(),
    registerUserQueue,
    forwardRef(() => StoreModule),
    EmailModule,
    TwilioModule,
  ],
  exports: [registerUserQueue],
  controllers: [UserController],
  providers: [
    UserCron,
    UserService,
    UserRepository,
    UserListener,
    UserProcessor,
    UserQueue,
  ],
})
export class UserModule {}
