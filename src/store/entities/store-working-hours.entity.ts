import { ApiProperty } from "@nestjs/swagger";
import { WeekDays } from "../enums/week-days.enum";
import { StoreTiming } from "./store-timing.entity";

export class StoreWorkingHours {
  @ApiProperty()
  day_code: number;

  @ApiProperty()
  day_name: WeekDays;

  @ApiProperty()
  timings: StoreTiming[];
}
