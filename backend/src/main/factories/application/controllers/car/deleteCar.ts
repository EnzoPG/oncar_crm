import { DeleteCarController } from "@/application/controllers";
import { makeDeleteCar } from "@/main/factories/useCases";

export const makeDeleteCarController = () => {
  return new DeleteCarController(makeDeleteCar());
};
