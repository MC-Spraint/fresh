import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  createTransport as CreateTransport,
  SentMessageInfo,
  Transporter,
} from "nodemailer";
import { EnvVariables } from "./../../config/env-variables.enum";

@Injectable()
export class EmailService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(EmailService.name);
  }

  /**
   * @param  {string} receiverEmail
   * @param  {string} subject
   * @param  {string} body
   * This function is called when we need to send emails
   */
  public async sendEmailTest(
    receiverEmail: string,
    subject: string,
    body: string,
  ): Promise<SentMessageInfo> {
    const SmtpTransport: Transporter<SentMessageInfo> = CreateTransport({
      service: "Gmail",
      auth: {
        user: this.configService.get<string>(EnvVariables.SENDER_ID) as string,
        pass: this.configService.get<string>(
          EnvVariables.SENDER_PASSWORD,
        ) as string,
      },
    });
    const mailOptions: {
      from: string;
      to: string;
      subject: string;
      html: string;
    } = {
      from: this.configService.get<string>(EnvVariables.SENDER_ID),
      to: receiverEmail,
      subject: subject,
      html: body,
    };
    try {
      this.logger.log("Mail has been sent successfully!");
      return SmtpTransport.sendMail(mailOptions);
    } catch (err) {
      throw err;
    }
  }
}
