import { CreateCarController } from "@/application/controllers";
import { makeCreateCar } from "@/main/factories/useCases";

export const makeCreateCarController = () => {
  return new CreateCarController(makeCreateCar());
};
