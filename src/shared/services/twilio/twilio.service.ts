import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TWILIO, TwilioInstance } from "./twilio.providers";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { EnvVariables } from "../../config/env-variables.enum";
import { authenticator, totp } from "otplib";
import { HashAlgorithms } from "otplib/core";

@Injectable()
export class TwilioService {
  private readonly logger: Logger;
  private readonly senderNumber: string;

  constructor(
    private readonly configsService: ConfigService,
    @Inject(TWILIO) private readonly twilio: TwilioInstance,
  ) {
    this.logger = new Logger(TwilioService.name);
    this.senderNumber = this.configsService.get<string>(
      EnvVariables.TWILIO_SENDER_NUMBER,
    ) as string;
  }

  private async sendSMS(to: string, body: string): Promise<MessageInstance> {
    try {
      const smsTransport = {
        to: to,
        from: this.senderNumber,
        body: body,
      };
      const smsResponse = await this.twilio.messages.create(smsTransport);
      this.logger.log(JSON.stringify(smsResponse, undefined, 4));
      return smsResponse;
    } catch (err: unknown) {
      this.logger.log(JSON.stringify(err, undefined, 4));
      throw err;
    }
  }

  public async sendVerificationOTP(
    mobile_number: string,
    OTP: string,
  ): Promise<string> {
    const message = `Your verification OTP is: ${OTP}`;
    const { sid } = await this.sendSMS(mobile_number, message);
    return sid;
  }

  public async generateSecret(): Promise<string> {
    const sec = authenticator.generateSecret();
    return sec;
  }

  public async generateOTP(digits: number, secret: string): Promise<string> {
    totp.options = {
      algorithms: HashAlgorithms,
      digits: digits,
      epoch: Date.now(),
      step: 60 * 5,
      window: 5,
    };
    const token = totp.generate(secret);
    return token;
  }

  public async verifyOTP(otp: string, secret: string): Promise<boolean> {
    return totp.verify({ token: otp, secret });
  }
}
