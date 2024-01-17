import { Injectable, Logger } from "@nestjs/common";
import { UserQueue } from "./user.queue";
import { OnEvent } from "@nestjs/event-emitter";
import { StoreAddedEvent } from "src/store/background-jobs/events/store-added.event";
import { StoreEvents } from "src/store/background-jobs/events/store.event.enum";
import { UserService } from "../user.service";

@Injectable()
export class UserListener {
  constructor(
    private readonly userQueue: UserQueue,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(UserListener.name);
  @OnEvent(StoreEvents.STORE_ADDED)
  async handleStoreAddedEvent(payload: StoreAddedEvent): Promise<void> {
    await this.userQueue.addStoreAddedJob(payload);
  }
}
