import { CreateCar, setupCreateCar } from "@/domain/useCases";
import { makeCarRepo, makeBcryptUtils } from "@/main/factories/infrastructure";

export const makeCreateCar = (): CreateCar => {
  return setupCreateCar(makeCarRepo());
};
