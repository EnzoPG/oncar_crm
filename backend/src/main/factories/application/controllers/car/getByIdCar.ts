import { GetByIdCarController } from "@/application/controllers";
import { makeGetByIdCar } from "@/main/factories/useCases";

export const makeGetByIdCarController = () => {
  return new GetByIdCarController(makeGetByIdCar());
};
