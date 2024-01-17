import { PartialType } from "@nestjs/mapped-types";
import { CreateStoreRequest } from "./create-store.request";

export class UpdateStoreDto extends PartialType(CreateStoreRequest) {}
