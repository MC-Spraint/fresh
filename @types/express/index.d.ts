import { User } from "src/user/entity/user.entity";
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
