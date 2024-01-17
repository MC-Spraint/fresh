import { Processor, Process } from "@nestjs/bull";
import Bull from "bull";
import { defaultWorkersConcurrency } from "src/shared/config/bull-queue.provider";
import { UserService } from "../user.service";
import { UserJobs } from "./user-jobs.enum";
import { USER_QUEUE } from "./user-queue.config";
import { QueJobsProcessor } from "src/shared/helpers/QueJobs.processor";
import { StoreAddedEvent } from "src/store/background-jobs/events/store-added.event";

@Processor(USER_QUEUE)
export class UserProcessor extends QueJobsProcessor {
  constructor(private readonly userService: UserService) {
    super(UserProcessor.name);
  }

  @Process({
    name: UserJobs.STORE_ADDED,
    concurrency: defaultWorkersConcurrency,
  })
  async addStoreIdToUser(job: Bull.Job<StoreAddedEvent>): Promise<boolean> {
    const {
      data: { userId, storeId },
    } = job;
    try {
      const response = await this.userService.addStoreId(
        String(userId),
        storeId,
      );
      return !!response;
    } catch (error) {
      throw error;
    }
  }
}
