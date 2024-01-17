import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { Request } from "express";

@Injectable()
export class ApiGuard implements CanActivate {
  private readonly logger = new Logger(ApiGuard.name);
  constructor(
    private readonly _authService: AuthService,
    private readonly _reflector: Reflector,
  ) {}
  async validate(request: Request): Promise<boolean> {
    const { headers } = request;
    const apiKey: string = headers["x-api-key"] as string;

    return this._authService.validateApiToken(apiKey);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );

    if (isPublic) {
      this.logger.log(`Public request`);
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    return this.validate(request);
  }
}
