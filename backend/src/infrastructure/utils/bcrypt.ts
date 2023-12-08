import { Bcrypt, ComparePassword, EncryptPassword } from "@/domain/contracts/utils";
import { compare, hash } from "bcryptjs";

export class BcryptUtils implements Bcrypt {
  async encrypt(input: EncryptPassword.Input): Promise<EncryptPassword.Output> {
    return await hash(input.password, input.time);
  }
  async compare(input: ComparePassword.Input): Promise<ComparePassword.Output> {
    return await compare(input.password, input.passwordHash);
  }
}
