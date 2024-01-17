import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { WeekDays } from "../enums/week-days.enum";
import { StoreTimingsDto } from "./store-timings.dto";

export class StoreWorkingHoursDto {
  @Max(6)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  day_code: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  day_name: WeekDays;

  @ValidateNested({ each: true })
  @Type(() => StoreTimingsDto)
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  timings: StoreTimingsDto[];
}
