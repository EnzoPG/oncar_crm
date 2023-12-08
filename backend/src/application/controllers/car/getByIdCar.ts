import { Controller } from "@/application/controllers";
import { GetByIdCar } from "@/domain/useCases";
import { Response, ok, notFound } from "@/application/helpers";
import { Validator, ValidationBuilder } from "@/application/validation";
import { NoDataFoundError } from "@/domain/entities/errors";
import { Car } from "@/domain/entities";

type HttpRequestParams = { id: string };

type Model = Error | Car;

export class GetByIdCarController extends Controller {
  constructor(private readonly getByIdCar: GetByIdCar) {
    super();
  }
  async perform(requestParams: HttpRequestParams): Promise<Response<Model>> {
    try {
      const result = await this.getByIdCar({
        _id: requestParams.id,
      });
      return ok(result);
    } catch (error) {
      if (error instanceof NoDataFoundError) return notFound(error);
      throw error;
    }
  }
}
