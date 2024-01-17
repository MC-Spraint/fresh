import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class Tokens {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  access_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "refresh_token" })
  refresh_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token_expiration" })
  access_token_expiration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "refresh_token_expiration" })
  refresh_token_expiration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "external_user_id" })
  external_user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "token_type" })
  token_type: string;
}
