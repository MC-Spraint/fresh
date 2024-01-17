import { Request } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
export interface WithUserRequest extends Request {
  user: string | Jwt | JwtPayload;
}
