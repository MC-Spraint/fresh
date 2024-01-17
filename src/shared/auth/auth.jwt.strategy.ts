import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { User } from "./../../user/entity/user.entity";
import { Types } from "mongoose";
@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
    });
  }
  async validate(user: User): Promise<{
    _id: Types.ObjectId;
    store_id: Types.ObjectId;
    name: string;
    email: string;
    role: string;
  }> {
    const { _id, store_id, name, email, role } = user;
    return { _id, store_id, name, email, role };
  }
}
