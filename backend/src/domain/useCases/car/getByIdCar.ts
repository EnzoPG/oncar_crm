import { CarRepository, GetByIdCar } from "@/domain/contracts";
import { NoDataFoundError } from "@/domain/entities";

export type GetByIdCar = (params: { _id: string }) => Promise<GetByIdCar.Output>;

type Setup = (carRepo: CarRepository) => GetByIdCar;

export const setupGetByIdCar: Setup = (carRepo) => async (params) => {

  const { _id } = params;

  const car = await carRepo.getById({
    _id,
  });

  if (!car) throw new NoDataFoundError("Nenhum modelo encontrado!");

  return car;
};
