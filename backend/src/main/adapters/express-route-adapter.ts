import { Controller } from "@/application/controllers";
import { NextFunction, Request, Response } from "express";

export interface HttpRequest {
  params: any;
  body: any;
  query: any;
}

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const { body, params, query } = httpRequest;

    const httpResponse = await controller.handle(body, params, query);
    if (httpResponse == undefined) {
      throw new Error("Server Error");
    }
    res.status(httpResponse.statusCode).json({ result: httpResponse.result, message: httpResponse.message });
  };
};
