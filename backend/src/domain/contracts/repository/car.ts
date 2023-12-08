import { Result } from "@/domain/contracts/result";
import { Car } from "@/domain/entities";

export interface CarRepository {
  create: (params: CreateCar.Input) => Promise<CreateCar.Output>;
  update: (params: UpdateCar.Input) => Promise<UpdateCar.Output>;
  delete: (params: DeleteCar.Input) => Promise<DeleteCar.Output>;
  getAll: (params: GetAllCars.Input) => Promise<GetAllCars.Output>;
  getById: (params: GetByIdCar.Input) => Promise<GetByIdCar.Output>;
}

export namespace CreateCar {
  export type Input = Partial<Car>;
  export type Output = Car;
}
export namespace UpdateCar {
  export type Input = Partial<Car>;
  export type Output = Car;
}
export namespace DeleteCar {
  export type Input = { _id: string; deletedAt: string };
  export type Output = Car;
}
export namespace GetAllCars {
  export type Input = { page: number; qtd: number; filters: { brand?: string; model?: string; year?: string; price?: string; color?: string; deletedAt: string } };
  export type Output = Result<Car[]>;
}
export namespace GetByIdCar {
  export type Input = { _id: string };
  export type Output = Car;
}
