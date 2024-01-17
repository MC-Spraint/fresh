import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested } from "class-validator";
import { Enm, OrderStatusHistoryModel } from "../xx.model";

export class CreateXxReq {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  enm: Enm;

  @IsNotEmpty()
  @Type(() => OrderStatusHistoryModel)
  status: OrderStatusHistoryModel[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  field1?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  field2?: string;
}
