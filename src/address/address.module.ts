import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressListener } from "./address.listener";
import { MongooseModule } from "@nestjs/mongoose";
import { AddressRepository } from "./address.repository";
import { AddressController } from "./address.controller";
import { UtilService } from "src/shared/utils/util.service";
import { AuthModule } from "src/shared/auth/auth.module";
import {
  AddressModel,
  AddressSchema,
} from "src/shared/database/models/address/address.model";
import {
  UserModel,
  UserSchema,
} from "src/shared/database/models/user/user.model";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddressModel.name, schema: AddressSchema },
    ]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [AddressController],
  providers: [UtilService, AddressListener, AddressService, AddressRepository],
})
export class AddressModule {}
