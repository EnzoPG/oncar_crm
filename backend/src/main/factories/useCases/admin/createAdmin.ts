import { CreateAdmin, setupCreateAdmin } from "@/domain/useCases";
import { makeAdminRepo, makeBcryptUtils } from "@/main/factories/infrastructure";

export const makeCreateAdmin = (): CreateAdmin => {
  return setupCreateAdmin(makeAdminRepo(), makeBcryptUtils());
};
