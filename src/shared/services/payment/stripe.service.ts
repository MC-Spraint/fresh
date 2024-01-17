import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvVariables } from "../../config/env-variables.enum";
import { Stripe } from "stripe";

@Injectable()
export class StripeService {
  private logger: Logger;

  private stripe: Stripe;
  private stripe_secret: string;
  private stripe_webhook_secret: string;

  private initializeStripe(): Stripe {
    this.stripe_secret = this.configService.get<string>(
      EnvVariables.STRIPE_SECRET,
    ) as string;
    const stripe = new Stripe(this.stripe_secret, {
      apiVersion: "2022-08-01",
    });
    this.logger.log(`Stripe instance successfully initialized`);
    return stripe;
  }

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(StripeService.name);
    this.stripe_webhook_secret = this.configService.get<string>(
      EnvVariables.STRIPE_WEBHOOK_SECRET,
    ) as string;
    this.stripe = this.initializeStripe();
  }

  public async webhookVerify(
    rawBody: Buffer,
    signature: string | string[] | Buffer,
  ): Promise<Stripe.Event> {
    try {
      const event = await this.stripe.webhooks.constructEventAsync(
        rawBody,
        signature,
        this.stripe_webhook_secret,
      );
      const object: Stripe.Event.Data.Object = event.data.object;
      const data = { ...event, data: { object } };
      this.logger.log(JSON.stringify(data, undefined, 4));
      return data;
    } catch (err) {
      throw err;
    }
  }
  public async createPaymentIntents(
    obj: Stripe.PaymentIntentCreateParams,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    try {
      const intent = await this.stripe.paymentIntents.create(obj);
      this.logger.log(`PaymentIntent`, intent);
      return intent;
    } catch (err) {
      throw err;
    }
  }
}
