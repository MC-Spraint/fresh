import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bull";
import { StoreAddedEvent } from "src/store/background-jobs/events/store-added.event";
import { UserJobs } from "./user-jobs.enum";
import { USER_QUEUE } from "./user-queue.config";

@Injectable()
export class UserQueue {
  private logger = new Logger(UserQueue.name);
  constructor(
    @InjectQueue(USER_QUEUE)
    private readonly userQueue: Queue,
  ) {}
  async addStoreAddedJob(payload: StoreAddedEvent): Promise<void> {
    this.logger.log(`Pending ${UserJobs.STORE_ADDED}`);
    await this.userQueue.add(UserJobs.STORE_ADDED, payload);
  }
}
