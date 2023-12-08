import Mongoose from "mongoose";

import { Admin } from "@/domain/entities";
import { AdminRepository, CreateAdmin, GetAuthenticateAdmin, GetEmailAdmin } from "@/domain/contracts";

const adminSchema = new Mongoose.Schema<Admin>({
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String },
  deletedAt: { type: String },
});

const adminDocument = Mongoose.model<Admin>("Admin", adminSchema);

export class AdminRepositoryMongoDb implements AdminRepository {
  async create(input: CreateAdmin.Input): Promise<CreateAdmin.Output> {
    const userAdmin = await adminDocument.create({
      ...input,
    });
    return new Admin(userAdmin);
  }
  async getEmail(input: GetEmailAdmin.Input): Promise<GetEmailAdmin.Output> {
    const getEmail = await adminDocument.findOne({ ...input });
    return getEmail ? true : false;
  }

  async getAuthenticate(input: GetAuthenticateAdmin.Input): Promise<GetAuthenticateAdmin.Output> {
    const auth = await adminDocument.findOne({ ...input });
    return auth;
  }
}
