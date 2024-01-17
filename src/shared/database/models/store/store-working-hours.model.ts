import { Schema, Prop } from "@nestjs/mongoose";
import { WeekDays } from "src/store/enums/week-days.enum";
import { StoreTimingsModel } from "./store-timings.model";

@Schema({ _id: false, timestamps: false })
export class StoreWorkingHoursModel {
  @Prop({ required: true, type: Number })
  day_code: number;

  @Prop({ required: true, enum: Object.keys(WeekDays) })
  day_name: WeekDays;

  @Prop({ required: true, type: [StoreTimingsModel] })
  timings: StoreTimingsModel[];
}
