import { DeleteCar, setupDeleteCar } from "@/domain/useCases";
import { makeCarRepo } from "@/main/factories/infrastructure";

export const makeDeleteCar = (): DeleteCar => {
  return setupDeleteCar(makeCarRepo());
};
