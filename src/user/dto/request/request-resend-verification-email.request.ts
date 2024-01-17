import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RequestResendVeriFicationEmail {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "user_id" })
  user_id: string;
}
