import { Controller } from "@/application/controllers";
import { DeleteCar } from "@/domain/useCases";
import { Response, ok, badRequest } from "@/application/helpers";
import { Validator, ValidationBuilder } from "@/application/validation";
import { DataAlreadyExistsError } from "@/domain/entities/errors";
import { Car } from "@/domain/entities";

type HttpRequestParams = { id: string };
type HttpRequestQuery = { id: string };

type Model = Error | Car;

export class DeleteCarController extends Controller {
  constructor(private readonly deleteCar: DeleteCar) {
    super();
  }
  async perform(requestParams: HttpRequestParams, requestQuery: HttpRequestQuery): Promise<Response<Model>> {
    try {
      const result = await this.deleteCar({
        _id: requestQuery.id,
      });
      return ok(result);
    } catch (error) {
      if (error instanceof DataAlreadyExistsError) return badRequest(error);
      throw error;
    }
  }
}
