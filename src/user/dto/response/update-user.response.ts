import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { User } from "src/user/entity/user.entity";

export class UpdateUserResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => User)
  data: Partial<User>;
}
