import { Controller } from "@/application/controllers";
import { CreateAdmin } from "@/domain/useCases/admin";
import { Response, ok, badRequest } from "@/application/helpers";
import { Validator, ValidationBuilder } from "@/application/validation";
import { DataAlreadyExistsError } from "@/domain/entities/errors";
import { Admin } from "@/domain/entities";

type HttpRequestBody = { email: string; password: string };

type Model = Error | Partial<Admin>;

export class CreateAdminController extends Controller {
  constructor(private readonly createAdmin: CreateAdmin) {
    super();
  }
  async perform(requestBody: HttpRequestBody): Promise<Response<Model>> {
    try {
      const result = await this.createAdmin({
        email: requestBody.email,
        password: requestBody.password,
      });
      return ok(result);
    } catch (error) {
      if (error instanceof DataAlreadyExistsError) return badRequest(error);
      throw error;
    }
  }
  buildValidators({ email, password }: HttpRequestBody): Validator[] {
    return [
      ...ValidationBuilder.of({ value: email, fieldName: "email" }).required().email().build(),
      ...ValidationBuilder.of({ value: password, fieldName: "password" }).required().build(),
    ];
  }
}
