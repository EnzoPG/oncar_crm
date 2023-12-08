import { CarRepository, DeleteCar } from "@/domain/contracts";
import { NoDataFoundError } from "@/domain/entities";
import { formatDateTime } from "@/domain/entities/helpers";

export type DeleteCar = (params: { _id: string }) => Promise<DeleteCar.Output>;

type Setup = (carRepo: CarRepository) => DeleteCar;

export const setupDeleteCar: Setup = (carRepo) => async (params) => {
  const { _id } = params;

  const car = await carRepo.getById({
    _id,
  });

  if (!car) {
    throw new NoDataFoundError("Nenhum veículo encontrado!");
  }

  const carDeleted = await carRepo.delete({
    _id,
    deletedAt: formatDateTime(new Date()),
  });

  return carDeleted;
};
