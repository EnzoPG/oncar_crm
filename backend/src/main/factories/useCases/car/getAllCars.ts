import { GetAllCars, setupGetAllCars } from "@/domain/useCases";
import { makeCarRepo, makeBcryptUtils } from "@/main/factories/infrastructure";

export const makeGetAllCars = (): GetAllCars => {
  return setupGetAllCars(makeCarRepo());
};
