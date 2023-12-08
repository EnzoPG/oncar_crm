export interface Jsonwebtoken {
  sign: (params: Sign.Input) => Sign.Output;
  verify: (params: Verify.Input) => Verify.Output;
}

export namespace Sign {
  export type Input = { email: string; key: string; subject: string; expiresIn: string | number };
  export type Output = string;
}
export namespace Verify {
  export type Input = { token: string; key: string };
  export type Output = string | any;
}
