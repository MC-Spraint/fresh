import { Module } from "@nestjs/common";
import { XxService } from "./xx.service";
import { XxController } from "./xx.controller";
import { XxRepo } from "./xx.repo";
import { MongooseModule } from "@nestjs/mongoose";
import { XxModel, XxSchema } from "./xx.model";

@Module({
  controllers: [XxController],
  imports: [
    MongooseModule.forFeature([{ name: XxModel.name, schema: XxSchema }]),
  ],
  providers: [XxService, XxRepo],
})
export class XxModule {}
