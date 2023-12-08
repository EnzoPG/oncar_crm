import { CarRepository, CreateCar } from "@/domain/contracts";
import { formatDateTime } from "@/domain/entities/helpers";

export type CreateCar = (params: { brand: string; model: string; year: string; price: string; color: string; }) => Promise<CreateCar.Output>;

type Setup = (carRepo: CarRepository) => CreateCar;

export const setupCreateCar: Setup = (carRepo) => async (params) => {
  const { brand, model, year, price, color } = params;

  const car = await carRepo.create({
    brand,
    model,
    year,
    price,
    color,
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
  });

  return car;
};
