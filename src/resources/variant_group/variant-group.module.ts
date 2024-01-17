import { Module } from "@nestjs/common";
import { VariantGroupService } from "./variant-group.service";
import { VariantGroupController } from "./variant-group.controller";

@Module({
  controllers: [VariantGroupController],
  providers: [VariantGroupService],
})
export class VariantGroupModule {}
