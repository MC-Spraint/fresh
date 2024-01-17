import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvVariables } from "../../config/env-variables.enum";
import { Twilio } from "twilio";

export const TWILIO = "TWILIO";
export type TwilioInstance = Twilio;

export const TwilioProviders = [
  {
    provide: TWILIO,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<Twilio> => {
      const logger = new Logger(TWILIO);
      const env = configService.get<string>(EnvVariables.NODE_ENV) as string;
      const accountSID = configService.get<string>(
        EnvVariables.TWILIO_ACCOUNT_SID,
      ) as string;
      const authToken = configService.get<string>(
        EnvVariables.TWILIO_AUTH_TOKEN,
      ) as string;
      const twilio = new Twilio(accountSID, authToken);
      logger.log(`Twilio instance successfully initialized in ${env}`);
      return twilio;
    },
  },
];
