import { CreateLeadController } from "@/application/controllers";
import { makeCreateLead } from "@/main/factories/useCases";

export const makeCreateLeadController = () => {
  return new CreateLeadController(makeCreateLead());
};
