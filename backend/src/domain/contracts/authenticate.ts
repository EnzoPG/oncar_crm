import { Admin } from "../entities";

export interface Authenticate {
  login: (params: Authenticate.Input) => Promise<Authenticate.Input>;
}
export namespace Authenticate {
  export type Input = { email: string; password: string };
  export type Output = { token: string; admin: Partial<Admin> };
}
