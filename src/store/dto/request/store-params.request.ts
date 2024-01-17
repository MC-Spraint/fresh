import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class StoreParamsDto {
  @IsString()
  @ApiProperty()
  lat: string;
  @IsString()
  @ApiProperty()
  lon: string;
  @IsString()
  @ApiProperty()
  dist: string;
  @IsOptional()
  @ApiProperty()
  name?: string;
  @IsOptional()
  @ApiProperty()
  page?: string;
  @IsOptional()
  @ApiProperty()
  limit?: string;
}
