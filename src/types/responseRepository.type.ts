import type { User } from "./user.type.js";
import type { status } from "./status.type.js";

export interface responseRepository<T = undefined> {
  status: status;
  message: string;
  data?: T;
}
