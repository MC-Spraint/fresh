import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotAcceptableException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  private logger: Logger = new Logger(RolesGuard.name);
  constructor(
    private readonly _authService: AuthService,
    private readonly _reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request, context);
  }
  validate(
    request: Request,
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = request;
    const bearerAccessToken: string = headers["authorization"] as string;
    const roles = this._reflector.get<UserRoles[]>(
      "roles",
      context.getHandler(),
    );
    if (!roles) return true;
    if (!bearerAccessToken) {
      this.logger.error(`Bearer token is missing in the headers`);
      throw new NotAcceptableException(
        "Bearer token is missing in the headers",
      );
    }
    return this._authService.validateRoles(bearerAccessToken, roles);
  }
}
