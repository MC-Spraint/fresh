import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResendOTPRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
