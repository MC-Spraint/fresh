import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CommonResponse } from "src/shared/shared/dto/common-response";

class UserId {
  @ApiProperty()
  _id: Types.ObjectId;
}
export class MobileLoginResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => UserId)
  data: UserId;
}
