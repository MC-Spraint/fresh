import { IsString, IsArray, IsOptional, ArrayNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
export class StoreLocationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({})
  type: string;

  @Type(() => Number)
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({})
  coordinates: number[];
}
