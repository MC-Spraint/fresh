import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "refresh_token" })
  refresh_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "refresh_token_expiration" })
  refresh_token_expiration: string;
}
