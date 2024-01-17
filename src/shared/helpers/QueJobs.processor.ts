import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  OnQueuePaused,
  OnQueueStalled,
  OnQueueWaiting,
  OnQueueActive,
  OnQueueCleaned,
} from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

export class QueJobsProcessor {
  logger: Logger;

  constructor(processorName: string) {
    this.logger = new Logger(processorName);
  }

  @OnQueueCleaned()
  OnQueueCleaned(job: Job): void {
    this.logger.warn(`Queue Cleaned: ${job.name}`);
  }
  @OnQueueWaiting()
  onQueueWaiting(job: Job): void {
    this.logger.warn(`Queue Waiting: ${job.name}`);
  }
  @OnQueueActive()
  onQueueActive(job: Job): void {
    this.logger.warn(`Queue Active: ${job.name}`);
  }
  @OnQueuePaused()
  onQueuePaused(job: Job): void {
    this.logger.warn(`Queue Paused: ${job.name}`);
  }
  @OnQueueStalled()
  onQueueStalled(job: Job): void {
    this.logger.warn(`Queue Stalled: ${job.name}`);
  }
  @OnQueueError()
  onQueueError(job: Job, error: Error): void {
    this.logger.error(`Queue Error: ${job.name} ${JSON.stringify(error)}`);
  }
  @OnQueueFailed()
  onQueueFailed(job: Job): void {
    this.logger.error(`Queue Failed: ${job.name} ${job.stacktrace}`);
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job, result: unknown): void {
    this.logger.warn(`Queue Completed: ${job.name} ${JSON.stringify(result)}`);
  }
}
