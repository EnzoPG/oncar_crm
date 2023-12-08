import { AdminRepository, CreateAdmin } from "@/domain/contracts";
import { Bcrypt } from "@/domain/contracts/utils";
import { formatDateTime } from "@/domain/entities/helpers";
import { DataAlreadyExistsError } from "@/domain/entities/errors";

export type CreateAdmin = (params: { email: string; password: string }) => Promise<CreateAdmin.Output>;

type Setup = (adminRepo: AdminRepository, bcrypt: Bcrypt) => CreateAdmin;

export const setupCreateAdmin: Setup = (adminRepo, bcrypt) => async (params) => {
  const { email, password } = params;

  const emailAdmin = await adminRepo.getEmail({ email });

  if (emailAdmin) throw new DataAlreadyExistsError("E-mail informado já existe!");

  const passwordHash = await bcrypt.encrypt({ password, time: 8 });

  const admin = await adminRepo.create({
    email,
    password: passwordHash,
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
  });

  return admin;
};
