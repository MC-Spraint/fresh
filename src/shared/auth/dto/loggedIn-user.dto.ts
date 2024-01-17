import { Types } from "mongoose";

export class LoggedInUser {
  _id: Types.ObjectId;
  store_id: Types.ObjectId | null;
  name: string;
  email: string;
  role: string;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}
