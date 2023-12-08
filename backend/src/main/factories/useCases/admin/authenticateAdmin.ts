import { AuthenticateAdmin, setupAuthenticateAdmin } from "@/domain/useCases";
import { makeAdminRepo, makeBcryptUtils, makeJsonwebtokenUtils } from "@/main/factories/infrastructure";

export const makeAuthenticateAdmin = (): AuthenticateAdmin => {
  return setupAuthenticateAdmin(makeAdminRepo(), makeBcryptUtils(), makeJsonwebtokenUtils());
};
