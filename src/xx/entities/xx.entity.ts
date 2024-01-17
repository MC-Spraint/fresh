import { ApiProperty } from "@nestjs/swagger";
import { Enm, OrderStatusHistoryModel } from "../xx.model";
import { Types } from "mongoose";

export class Xx {
  @ApiProperty({})
  name: string;

  @ApiProperty({})
  age: number;

  @ApiProperty({})
  enm: Enm;

  @ApiProperty({})
  status: OrderStatusHistoryModel[];

  @ApiProperty({})
  field1: string;

  @ApiProperty({})
  field2: string;

  //Common fields
  @ApiProperty({ type: String, description: "_id" })
  _id: Types.ObjectId;

  @ApiProperty({ type: Date, description: "createdAt" })
  createdAt: Date;

  @ApiProperty({ type: Date, description: "updatedAt" })
  updatedAt: Date;
}
