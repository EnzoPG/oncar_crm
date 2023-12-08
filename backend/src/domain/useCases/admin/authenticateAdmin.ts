import { Authenticate, AdminRepository, Bcrypt, Jsonwebtoken } from "@/domain/contracts";
import { AuthenticationError } from "@/domain/entities/errors";

export type AuthenticateAdmin = (params: { email: string; password: string }) => Promise<Authenticate.Output>;

type Setup = (adminRepo: AdminRepository, bcrypt: Bcrypt, jsonwebtoken: Jsonwebtoken) => AuthenticateAdmin;

export const setupAuthenticateAdmin: Setup = (adminRepo, bcrypt, jsonwebtoken) => async (params) => {
  const { email, password } = params;
  const admin = await adminRepo.getAuthenticate({ email });

  if (!admin) {
    throw new AuthenticationError("Por Favor verifique, E-mail ou Senha incorretos!");
  }

  const passwordMatch = await bcrypt.compare({ password, passwordHash: admin.password });

  if (!passwordMatch) {
    throw new AuthenticationError("Por Favor verifique, E-mail ou Senha incorretos!");
  }

  const token = jsonwebtoken.sign({ email: admin.email, key: process.env.TOKEN_KEY, subject: admin._id.toString(), expiresIn: "7d" });

  return { token: token, admin: { _id: admin._id.toString() } };
};
