import { Admin } from "@/domain/entities/";

export interface AdminRepository {
  create: (params: CreateAdmin.Input) => Promise<CreateAdmin.Output>;
  getEmail: (params: GetEmailAdmin.Input) => Promise<GetEmailAdmin.Output>;
  getAuthenticate: (params: GetAuthenticateAdmin.Input) => Promise<GetAuthenticateAdmin.Output>;
}

type TypeAdmin = {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export namespace CreateAdmin {
  export type Input = TypeAdmin;
  export type Output = TypeAdmin;
}

export namespace GetEmailAdmin {
  export type Input = { email: string };
  export type Output = boolean;
}

export namespace GetAuthenticateAdmin {
  export type Input = { email: string };
  export type Output = Admin;
}
