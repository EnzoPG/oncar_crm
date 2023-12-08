import { Controller } from "@/application/controllers";
import { GetUserScore } from "@/domain/useCases";
import { Response, badRequest, ok } from "@/application/helpers";
import { DataAlreadyExistsError, Lead } from "@/domain/entities";

type HttpRequestParams = { id: string };
type HttpRequestQuery = { id: string };

type Model = Error | Lead;

export class GetUserScoreController extends Controller {
  constructor(private readonly getUserScore: GetUserScore) {
    super();
  }
  async perform(requestParams: HttpRequestParams, requestQuery: HttpRequestQuery): Promise<Response<Model>> {
    try {
      const result = await this.getUserScore({
        idUser: requestQuery.id
      });
      return ok(result);
    } catch (error) {
      if (error instanceof DataAlreadyExistsError) return badRequest(error);
      throw error;
    }
  }
}
