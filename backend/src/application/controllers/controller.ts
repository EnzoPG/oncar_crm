import { badRequest, Response, serverError } from "@/application/helpers";
import { ValidationComposite, Validator } from "@/application/validation";

export abstract class Controller {
  abstract perform(httpRequestBody: any, httpRequestParams?: any, httpRequestQuery?: any, httpRequestFile?: any): Promise<Response>;

  buildValidators(httpRequestBody: any, httpRequestParams?: any, httpRequestQuery?: any, httpRequestFile?: any): Validator[] {
    return [];
  }

  async handle(httpRequestBody: any, httpRequestParams?: any, httpRequestQuery?: any, httpRequestFile?: any): Promise<Response> {
    const error = this.validate(httpRequestBody, httpRequestParams, httpRequestQuery, httpRequestFile);
    if (error !== undefined) return badRequest(error);
    try {
      return await this.perform(httpRequestBody, httpRequestParams, httpRequestQuery, httpRequestFile);
    } catch (error) {
      console.log(httpRequestBody, httpRequestParams, httpRequestQuery, httpRequestFile);
      return serverError(error);
    }
  }

  private validate(httpRequestBody: any, httpRequestParams?: any, httpRequestQuery?: any, httpRequestFile?: any): Error | undefined {
    const validators = this.buildValidators(httpRequestBody, httpRequestParams, httpRequestQuery, httpRequestFile);
    return new ValidationComposite(validators).validate();
  }
}
