import { ApiProperty } from "@nestjs/swagger";

export class VerifyForgotPasswordDto {
  @ApiProperty({ type: String, description: "message" })
  message: string;

  @ApiProperty({ type: String, description: "id" })
  id: string;

  @ApiProperty({ type: String, description: "token" })
  token: string;
}
