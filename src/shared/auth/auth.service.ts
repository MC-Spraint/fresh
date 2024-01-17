import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import {
  SignOptions,
  sign as Sign,
  verify as Verify,
  VerifyOptions,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { OneSignalService } from "../services/push_notification/one-signal.service";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { LoggedInUser } from "./dto/loggedIn-user.dto";
import { Tokens } from "./dto/tokens.dto";
import { AccessTokenDto } from "./dto/access-token.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { EnvVariables } from "../config/env-variables.enum";

@Injectable()
export class AuthService {
  private readonly publicKey: string;
  private readonly privateKey: string;
  private readonly accessTokenSecret: string;
  private readonly accessTokenExpiration: string;
  private readonly refreshTokenSecret: string;
  private readonly refreshTokenExpiration: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly _notificationService: OneSignalService,
  ) {
    this.privateKey = this.configService.get<string>(EnvVariables.PRIVATE_KEY);
    this.publicKey = this.configService.get<string>(EnvVariables.PUBLIC_KEY);
    this.accessTokenSecret = this.configService.get<string>(
      EnvVariables.ACCESS_TOKEN_SECRET,
    );
    this.accessTokenExpiration = this.configService.get<string>(
      EnvVariables.ACCESS_TOKEN_EXPIRATION,
    );
    this.refreshTokenSecret = this.configService.get<string>(
      EnvVariables.REFRESH_TOKEN_SECRET,
    );
    this.refreshTokenExpiration = this.configService.get<string>(
      EnvVariables.REFRESH_TOKEN_EXPIRATION,
    );
  }
  public validateApiToken(apiKey: string): boolean {
    const api_key: string = process.env.API_KEY;
    if (api_key !== apiKey) {
      throw new ForbiddenException();
    }
    return true;
  }

  public getExternalUserId(userId: string): string {
    return this._notificationService.getExternalUserIdHash(userId);
  }

  public hashPassword(password: string): string {
    const saltOrRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltOrRounds);
    return passwordHash;
  }

  public compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }

  public generateHash(data: string, saltOrRounds: number): string {
    const passwordHash = bcrypt.hashSync(data, saltOrRounds);
    return passwordHash;
  }

  public getAccessToken(payload: JwtPayloadDto): AccessTokenDto {
    const signOptions: SignOptions = {
      algorithm: "RS256",
      jwtid: this.accessTokenSecret,
      subject: "Validation",
      expiresIn: this.accessTokenExpiration,
    };
    const access_token: string = Sign(payload, this.privateKey, signOptions);
    const response = {
      access_token,
      access_token_expiration: this.accessTokenExpiration,
    };
    return response;
  }

  public getRefreshToken(payload: JwtPayloadDto): RefreshTokenDto {
    const signOptions: SignOptions = {
      algorithm: "RS256",
      jwtid: this.refreshTokenSecret,
      subject: "Validation",
      expiresIn: this.refreshTokenExpiration,
    };
    const refresh_token: string = Sign(payload, this.privateKey, signOptions);
    const response = {
      refresh_token,
      refresh_token_expiration: this.refreshTokenExpiration,
    };
    return response;
  }

  public getTokens(payload: JwtPayloadDto): Tokens {
    const { access_token, access_token_expiration } =
      this.getAccessToken(payload);
    const { refresh_token, refresh_token_expiration } =
      this.getRefreshToken(payload);
    const externalUserId: string =
      this._notificationService.getExternalUserIdHash(String(payload._id));
    const tokens = {
      access_token: access_token,
      refresh_token: refresh_token,
      access_token_expiration: access_token_expiration,
      refresh_token_expiration: refresh_token_expiration,
      external_user_id: externalUserId,
      token_type: "Bearer",
    };
    return tokens;
  }

  public async validateAccessToken(
    bearerHeader: string,
  ): Promise<LoggedInUser> {
    const token: string = bearerHeader.split(" ")[1];
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
      jwtid: this.accessTokenSecret,
      subject: "Validation",
      maxAge: this.accessTokenExpiration,
      ignoreExpiration: true,
    };
    try {
      const decodedPayload: LoggedInUser = Verify(
        token,
        this.publicKey,
        verifyOptions,
      ) as LoggedInUser;
      return decodedPayload;
    } catch (err) {
      throw new TokenExpiredError(
        "Access token is either expired or invalid",
        err,
      );
    }
  }

  public async validateRefreshToken(token: string): Promise<LoggedInUser> {
    const verifyOptions: VerifyOptions = {
      algorithms: ["RS256"],
      jwtid: this.refreshTokenSecret,
      subject: "Validation",
      maxAge: this.refreshTokenExpiration,
      ignoreExpiration: true,
    };
    try {
      const decodedPayload: LoggedInUser = Verify(
        token, 
        this.publicKey,
        verifyOptions,
      ) as LoggedInUser;
      return decodedPayload;
    } catch (err) {
      throw new TokenExpiredError(
        "Refresh token is either expired or invalid",
        err,
      );
    }
  }

  public async validateRoles(
    bearerHeader: string,
    roles: string[],
  ): Promise<boolean> {
    const decodedPayloadForAt: JwtPayload = await this.validateAccessToken(
      bearerHeader,
    );
    if (!roles.includes(decodedPayloadForAt.role)) {
      throw new ForbiddenException(
        "You tried to access a role without being authorized",
      );
    }
    return true;
  }
}
