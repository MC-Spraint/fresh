import { BullModuleOptions, SharedBullAsyncConfiguration } from "@nestjs/bull";
import Bull from "bull";

export const bullQueueOptions: SharedBullAsyncConfiguration = {
  useFactory: async () => {
    const port = Number(process.env.REDIS_PORT);
    const host = process.env.REDIS_HOST as string;
    const password = process.env.REDIS_PASSWORD as string;
    // const nodeEnv = process.env.NODE_ENV as string;
    // const isDev = nodeEnv && nodeEnv === 'development';
    const options: BullModuleOptions = {
      redis: {
        password,
        port,
        host,
        username: "default",
      },
      defaultJobOptions: {
        removeOnComplete: false,
      },
    };
    // if (!isDev) {
    //   options.redis = { ...options.redis, tls: { servername: host } };
    // }
    return options;
  },
};

export const defaultJobOptions: Bull.JobOptions = {
  backoff: { type: "fixed", delay: 5000 },
  attempts: 2,
};

export const defaultWorkersConcurrency = 20;
