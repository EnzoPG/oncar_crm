import { UpdateCarController } from "@/application/controllers";
import { makeUpdateCar } from "@/main/factories/useCases";

export const makeUpdateCarController = () => {
  return new UpdateCarController(makeUpdateCar());
};
