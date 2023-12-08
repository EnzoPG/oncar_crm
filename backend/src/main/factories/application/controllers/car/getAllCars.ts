import { GetAllCarsController } from "@/application/controllers";
import { makeGetAllCars } from "@/main/factories/useCases";

export const makeGetAllCarsController = () => {
  return new GetAllCarsController(makeGetAllCars());
};
