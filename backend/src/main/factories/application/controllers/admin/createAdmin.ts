import { CreateAdminController } from "@/application/controllers";
import { makeCreateAdmin } from "@/main/factories/useCases";

export const makeCreateAdminController = () => {
  return new CreateAdminController(makeCreateAdmin());
};
