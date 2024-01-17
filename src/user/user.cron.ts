import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { UserService } from "./user.service";

@Injectable()
export class UserCron {
  logger: Logger;
  constructor(private readonly _userService: UserService) {
    this.logger = new Logger(UserCron.name);
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  public async removeNotVerifiedUsers(): Promise<void> {
    await this._userService.removeNotVerifiedUsers();
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  public async removeNotVerifiedUsersMobile(): Promise<void> {
    const users = await this._userService.removeNotVerifiedUsersMobile();
    this.logger.log(`removeNotVerifiedUsersMobile: count - ${users}`);
  }
}
