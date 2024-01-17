import {
  Controller,
  Get,
  Post,
  Req,
  RawBodyRequest,
  UseGuards,
  Render,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "./shared/auth/decorators/public.decorator";
import { UtilService } from "./shared/utils/util.service";
import { Stripe } from "stripe";
import { Request } from "express";
import { GetUser } from "./shared/auth/decorators/get-user.decorator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { LoggedInUser } from "./shared/auth/dto/loggedIn-user.dto";
import { AuthGuard } from "./shared/auth/guards/auth.guard";
import { VerifyForgotPasswordDto } from "./user/dto/verify-forgot-password.dto";
import { RolesGuard } from "./shared/auth/guards/roles.guard";
import { Roles } from "./shared/auth/decorators/roles.decorator";
import { UserRoles } from "./shared/shared/enums/userRoles.enum";

@ApiTags("Module app")
@Controller("")
export class AppController {
  constructor(private appService: AppService, private _util: UtilService) {}

  //@UseGuards(AuthGuard("jwt"))

  @Get("/test")
  @Public()
  async test(): Promise<string> {
    return await this.appService.test();
  }
  @Get("/welcome")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @ApiProperty({ title: "Welcome", description: "Welcome" })
  async welcome(@GetUser() user: LoggedInUser): Promise<string> {
    const response = this.appService.welcomeUser(user);
    return response;
    //throw new BadRequestException("bad");
    //return this.appService.welcome();
  }
  @Public()
  @ApiProperty({
    title: "Stripe Webhook API",
    description: "Stripe webhook API",
  })
  @Post("/webhook/stripe")
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
  ): Promise<Stripe.Event> {
    return await this.appService.stripeWebhook(req);
  }
  @Get("/testt")
  @Render("test")
  @Public()
  async verifyForgotPassword(): Promise<VerifyForgotPasswordDto> {
    const id = "fafa";
    const token = "fsf";
    return {
      message: "Email is verified successfully",
      id: id,
      token: token,
    };
  }
}
