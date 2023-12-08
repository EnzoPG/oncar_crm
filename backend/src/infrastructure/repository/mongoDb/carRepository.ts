import Mongoose from "mongoose";

import { Car } from "@/domain/entities";
import { CarRepository, CreateCar, UpdateCar, GetAllCars, GetByIdCar, DeleteCar, Result } from "@/domain/contracts";

const carSchema = new Mongoose.Schema<Car>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: String, required: true },
  color: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String },
  deletedAt: { type: String },
});

const carDocument = Mongoose.model<Car>("Car", carSchema);

export class CarRepositoryMongoDb implements CarRepository {
  async create(input: CreateCar.Input): Promise<CreateCar.Output> {
    const car = await carDocument.create({
      ...input,
    });
    return new Car(car);
  }
  async update(input: UpdateCar.Input): Promise<UpdateCar.Output> {
    const car = await carDocument.findByIdAndUpdate({ _id: input._id }, { ...input });
    return new Car(car);
  }

  async delete(input: DeleteCar.Input): Promise<DeleteCar.Output> {
    const car = await carDocument.findByIdAndUpdate({ _id: input._id }, { deletedAt: input.deletedAt });
    return car;
  }

  async getAll(input?: GetAllCars.Input): Promise<Result<GetAllCars.Output>> {
    const cars = new Result<Car>();
    cars.page = input.page;
    cars.qtd = input.qtd;
    cars.total = await carDocument.find(input.filters).count({ deletedAt: null });
    const carResults = await carDocument
      .find(input.filters)
      .sort({ name: 1 })
      .collation({ locale: "pt", strength: 1 })
      .skip(input.page * input.qtd - input.qtd)
      .limit(input.qtd);
    cars.data = carResults.map((car) => new Car(car as Car));

    return cars;
  }

  async getById(input: GetByIdCar.Input): Promise<GetByIdCar.Output> {
    const car = await carDocument.findById({ _id: input._id, deletedAt: null }, {});
    return new Car(car);
  }
}
