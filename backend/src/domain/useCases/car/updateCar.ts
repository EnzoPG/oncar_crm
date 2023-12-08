import { CarRepository, UpdateCar } from "@/domain/contracts";
import { NoDataFoundError, formatDateTime } from "@/domain/entities";

export type UpdateCar = (params: { _id: string; brand: string; model: string; year: string; price: string; color: string; }) => Promise<UpdateCar.Output>;

type Setup = (carRepo: CarRepository) => UpdateCar;

export const setupUpdateCar: Setup = (carRepo) => async (params) => {
  const { _id, brand, model, price, year, color } = params;

  const car = await carRepo.getById({
    _id,
  });

  if (!car) throw new NoDataFoundError("Nenhum modelo encontrado!");

  car.brand = brand ? brand : car.brand;
  car.model = model ? model : car.model;
  car.price = price ? price : car.price;
  car.year = year ? year : car.year;
  car.color = color ? color : car.color;
  car.updatedAt = formatDateTime(new Date());

  await carRepo.update(car);

  const carUpdate = await carRepo.getById({
    _id,
  });

  return carUpdate;
};
