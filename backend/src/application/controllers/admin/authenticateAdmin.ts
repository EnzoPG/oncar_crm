import { Controller } from "@/application/controllers";
import { AuthenticateAdmin } from "@/domain/useCases";
import { Response, ok, unauthenticated } from "@/application/helpers";
import { Validator, ValidationBuilder } from "@/application/validation";
import { AuthenticationError } from "@/domain/entities/errors";
import { Admin } from "@/domain/entities";

type HttpRequestBody = {
  email: string;
  password: string;
};
type Model = Error | { token: string; admin: Partial<Admin> };

export class AuthenticateAdminController extends Controller {
  constructor(private readonly authenticateAdmin: AuthenticateAdmin) {
    super();
  }
  async perform(requestBody: HttpRequestBody): Promise<Response<Model>> {
    try {
      const result = await this.authenticateAdmin({
        email: requestBody.email,
        password: requestBody.password,
      });
      return ok(result);
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthenticated(error);
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
