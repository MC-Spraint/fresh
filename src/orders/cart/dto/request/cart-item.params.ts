import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CartItemParams {
  @ApiProperty({})
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  productId: Types.ObjectId;
}
