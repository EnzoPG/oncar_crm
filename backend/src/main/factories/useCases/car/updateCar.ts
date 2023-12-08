import { UpdateCar, setupUpdateCar } from "@/domain/useCases";
import { makeCarRepo, makeBcryptUtils } from "@/main/factories/infrastructure";

export const makeUpdateCar = (): UpdateCar => {
  return setupUpdateCar(makeCarRepo());
};
