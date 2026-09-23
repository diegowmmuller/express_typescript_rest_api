import type { status } from "./status.type.js";

export interface responseService<T = undefined> {
  status: status;
  message: string;
  data?: T;
}
