import { Injectable, Logger } from "@nestjs/common";
import {
  Notification as OneSignalNotification,
  Configuration as OneSignalConfiguration,
  DefaultApi as OneSignalDefaultApi,
  NotificationSlice,
} from "@onesignal/node-onesignal";
import * as OneSignal from "@onesignal/node-onesignal";
import { createHmac } from "crypto";
import { ConfigService } from "@nestjs/config";
import { AppType } from "./enums/app-type.enum";
import { OneSignalSegments } from "./onesignal-segment.enum";
import { EnvVariables } from "../../config/env-variables.enum";

@Injectable()
export class OneSignalService {
  client: OneSignalDefaultApi;
  appId: string;
  deliveryAppClient: OneSignalDefaultApi;
  deliveryAppId: string;
  private readonly logger = new Logger(OneSignalService.name);
  private getOneSignalClient(app_key: string): OneSignalDefaultApi {
    const app_key_provider = {
      getToken(): string {
        return app_key;
      },
    };
    const configurationObject: OneSignalConfiguration =
      OneSignal.createConfiguration({
        authMethods: {
          app_key: {
            tokenProvider: app_key_provider,
          },
        },
      });
    const client = new OneSignalDefaultApi(configurationObject);
    return client;
  }
  private configureOneSignal(
    app_id: string,
    app_key: string,
    app: AppType,
  ): void {
    this.appId = app_id;
    this.client = this.getOneSignalClient(app_key);
    if (app === AppType.DELIVERY) {
      this.deliveryAppId = app_id;
      this.deliveryAppClient = this.getOneSignalClient(app_key);
    }
  }
  constructor(private readonly configService: ConfigService) {
    const userApiKey = this.configService.get<string>(
      EnvVariables.ONESIGNAL_USER_API_KEY,
    ) as string;
    const appId = this.configService.get<string>(
      EnvVariables.ONESIGNAL_USER_APP_ID,
    ) as string;
    this.configureOneSignal(appId, userApiKey, AppType.USER);
    const deliveryApiKey = this.configService.get<string>(
      EnvVariables.ONESIGNAL_DELIVERY_PARTNER_API_KEY,
    ) as string;
    const deliveryApppId = this.configService.get<string>(
      EnvVariables.ONESIGNAL_DELIVERY_PARTNER_APP_ID,
    ) as string;
    this.configureOneSignal(deliveryApppId, deliveryApiKey, AppType.DELIVERY);
  }
  private getNotificationObject(
    title: string,
    message: string,
    data: object,
  ): OneSignalNotification {
    const notification = new OneSignalNotification();
    notification.headings = {
      en: title,
    };
    notification.contents = {
      en: message,
    };
    notification.data = data;
    notification.priority = 10;
    return notification;
  }

  public async sendNotificationToSegments(
    title: string,
    message: string,
    deeplink: object,
    included_segments: OneSignalSegments[],
    app_type: AppType = AppType.USER,
  ): Promise<unknown> {
    const notification = this.getNotificationObject(title, message, deeplink);
    notification.app_id = this.appId;
    if (app_type === AppType.DELIVERY) notification.app_id = this.deliveryAppId;
    const result = await this.client.createNotification({
      ...notification,
      included_segments: [...included_segments],
    });
    return result;
  }

  public async sendNotificationToPlayerIds(
    title: string,
    message: string,
    deeplink: object,
    include_external_user_ids: string[],
    app_type: AppType = AppType.USER,
  ): Promise<unknown> {
    const notification = this.getNotificationObject(title, message, deeplink);
    notification.app_id = this.appId;
    if (app_type === AppType.DELIVERY) notification.app_id = this.deliveryAppId;
    const result = await this.client.createNotification({
      ...notification,
      include_player_ids: [...include_external_user_ids],
    });
    return result;
  }

  public async sendNotificationToExternalUserIds(
    title: string,
    message: string,
    deeplink: object,
    include_external_user_ids: string[],
    app_type: AppType = AppType.USER,
  ): Promise<unknown> {
    const notification = this.getNotificationObject(title, message, deeplink);
    notification.app_id = this.appId;
    if (app_type === AppType.DELIVERY) notification.app_id = this.deliveryAppId;
    const result = await this.client.createNotification({
      ...notification,
      include_external_user_ids: [...include_external_user_ids],
      channel_for_external_user_ids: "push",
    });
    return result;
  }

  public async getNotificationsHistory(
    app_type: AppType = AppType.USER,
  ): Promise<NotificationSlice> {
    let app_id: string;
    app_id = this.appId;
    if (app_type === AppType.DELIVERY) app_id = this.deliveryAppId;
    const result = await this.client.getNotifications(app_id);
    return result;
  }

  public getExternalUserIdHash(data: string): string {
    const appKey = this.configService.get<string>(
      "ONESIGNAL_USER_API_KEY",
    ) as string;
    const hmac = createHmac("sha256", appKey);
    hmac.update(data);
    const hex = hmac.digest("hex");
    return hex;
  }

  public getExternalPartnerIdHash(data: string): string {
    const appKey = this.configService.get<string>(
      "ONESIGNAL_DELIVERY_API_KEY",
    ) as string;
    const hmac = createHmac("sha256", appKey);
    hmac.update(data);
    const hex = hmac.digest("hex");
    //The Hmac object can not be used again after hmac.digest() has been called.
    return hex;
  }
}
