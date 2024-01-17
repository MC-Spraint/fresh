import { BullModule, BullModuleOptions } from "@nestjs/bull";
import { defaultJobOptions } from "src/shared/config/bull-queue.provider";

export const USER_QUEUE = "user";
export const userQueueConfig: BullModuleOptions = {
  name: USER_QUEUE,
  defaultJobOptions: defaultJobOptions,
};

export const registerUserQueue = BullModule.registerQueueAsync(userQueueConfig);
