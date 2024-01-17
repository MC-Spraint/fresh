import { Injectable, Logger, RawBodyRequest } from "@nestjs/common";
import { StripeService } from "./shared/services/payment/stripe.service";
import { Request } from "express";
import { OneSignalService } from "./shared/services/push_notification/one-signal.service";
import { Stripe } from "stripe";
import { LoggedInUser } from "./shared/auth/dto/loggedIn-user.dto";
export enum OneSignalSegments {
  SUBSCRIBED_USERS = "Subscribed Users",
  INACTIVE_USERS = "Inactive Users",
}
@Injectable()
export class AppService {
  private appServiceLogger = new Logger(AppService.name);
  constructor(
    private readonly stripe: StripeService,
    private readonly notificationService: OneSignalService,
  ) {}
  public async welcomeUser(user: LoggedInUser): Promise<string> {
    const name = user.name.split(" ")[0];
    return `Welcome ${name ? name : `buddy`}!`;
  }
  async stripeWebhook(req: RawBodyRequest<Request>): Promise<Stripe.Event> {
    const payload = req.rawBody as Buffer;
    const signature = req.headers["stripe-signature"] as string;
    this.appServiceLogger.log(req.body.read);
    const event = this.stripe.webhookVerify(payload, signature);
    return event;
  }
  async test(): Promise<any> {
    // const result = await this.notificationService.sendNotificationToPlayerIds(
    //   "This is a title",
    //   "This is a body",
    //   null,
    //   ["579c83dc-808e-4e43-a52b-b3b50ff9a435"]
    // );
    // this.appServiceLogger.log(result);
    // if (result.errors) {
    //   this.appServiceLogger.log(result.errors, undefined, 4);
    //   return `Failed to send Engagement Notification`;
    // }
    // return `Engagement Notification Sent to ${result.recipients} Users`;
    const hex = await this.notificationService.getExternalUserIdHash(
      "630205af3d68f50c5fc9edf7",
    );
    console.log(hex);
    const data = {
      page: `www.google.com`,
    };
    const r = await this.notificationService.sendNotificationToExternalUserIds(
      "This is a title",
      "This is a Message",
      data,
      ["630205af3d68f50c5fc9edf7"],
    );
    return r;
  }
}
