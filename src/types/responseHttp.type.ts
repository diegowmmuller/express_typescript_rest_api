import type { status } from "./status.type.js";

export interface responseController<T = undefined> {
  status: status;
  message: string;
  data?: T;
}
