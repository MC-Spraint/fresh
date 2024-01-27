import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class Contact {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  message: string;

  //Common fields
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
