import { Controller } from "@/application/controllers";
import { GenerateScore } from "@/domain/useCases";
import { Response, badRequest, ok } from "@/application/helpers";
import { Validator, ValidationBuilder } from "@/application/validation";
import { DataAlreadyExistsError, Lead } from "@/domain/entities";

type HttpRequestBody = { idUser: string; };

type Model = Error | Lead;

export class CreateLeadController extends Controller {
  constructor(private readonly createLead: GenerateScore) {
    super();
  }
  async perform(requestBody: HttpRequestBody): Promise<Response<Model>> {
    try {
      const result = await this.createLead({
        idUser: requestBody.idUser,
      });
      return ok(result);
    } catch (error) {
      if (error instanceof DataAlreadyExistsError) return badRequest(error);
      throw error;
    }
  }
  buildValidators({ idUser }: HttpRequestBody): Validator[] {
    return [
      ...ValidationBuilder.of({ value: idUser, fieldName: "idUser" }).required().build(),
    ];
  }
}
