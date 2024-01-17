import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
export class AccessTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  access_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token_expiration" })
  access_token_expiration: string;
}
