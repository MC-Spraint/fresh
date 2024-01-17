import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
export class JwtPayloadDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: "access_token" })
  store_id: Types.ObjectId | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "access_token" })
  role: string;
}
