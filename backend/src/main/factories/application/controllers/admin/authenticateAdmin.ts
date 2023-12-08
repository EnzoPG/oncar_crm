import { AuthenticateAdminController } from "@/application/controllers";
import { makeAuthenticateAdmin } from "@/main/factories/useCases";

export const makeAuthenticateAdminController = () => {
  return new AuthenticateAdminController(makeAuthenticateAdmin());
};
