import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotAcceptableException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { LoggedInUser } from "../dto/loggedIn-user.dto";
@Injectable()
export class AuthGuard implements CanActivate {
  private logger: Logger = new Logger(AuthGuard.name);

  constructor(private readonly _authService: AuthService) {}

  private async validate(request: Request): Promise<boolean> {
    const { headers } = request;
    const bearerAccessToken: string = headers["authorization"] as string;
    if (!bearerAccessToken) {
      this.logger.error(`Bearer token is missing in the headers`);
      throw new NotAcceptableException(
        "Bearer token is missing in the headers",
      );
    }
    const decodePayloadForAT: LoggedInUser =
      await this._authService.validateAccessToken(bearerAccessToken);
    if (!decodePayloadForAT) return false;
    request.user = decodePayloadForAT;
    return true;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.validate(request);
  }
}
