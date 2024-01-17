import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { SentMessageInfo } from "nodemailer";
import { Types } from "mongoose";
export class MailResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "mailResponse" })
  mailResponse: SentMessageInfo;
}
