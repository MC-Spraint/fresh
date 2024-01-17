import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { SystemService } from "../shared/services/system/system.service";

@Module({
  controllers: [UploadController],
  providers: [UploadService, SystemService],
})
export class UploadModule {}
