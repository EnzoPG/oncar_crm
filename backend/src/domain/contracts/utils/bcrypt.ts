export interface Bcrypt {
  encrypt: (params: EncryptPassword.Input) => Promise<EncryptPassword.Output>;
  compare:(params: ComparePassword.Input) => Promise<ComparePassword.Output>;
}

export namespace EncryptPassword {
  export type Input = { password: string; time: string | number };
  export type Output = Promise<string>;
}
export namespace ComparePassword {
  export type Input = { password: string; passwordHash: string };
  export type Output = Promise<boolean>;
}
