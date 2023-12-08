/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from "@/application/errors";

enum FunctionsErrorCode {
  "ok" = 200,
  "invalid-argument" = 400,
  "not-found" = 404,
  "internal" = 500,
  "unauthenticated" = 401,
}

export type Response<T = any , message = string> = {
  statusCode: FunctionsErrorCode;
  result: T;
  message: message;
};

export const ok = <T = any>(result: T): Response<T> => ({
  statusCode: 200,
  result,
  message: "ok",
});

export const badRequest = (error: Error): Response<Error> => ({
  statusCode: 400,
  result: error,
  message: "invalid-argument",
});

export const unauthenticated = (error: any): Response<Error> => ({
  statusCode: 401 | 500,
  result: error,
  message: "unauthenticated",
});

export const notFound = (error: any): Response<Error> => ({
  statusCode: 404,
  result: error,
  message: "not-found",
});

export const serverError = (error: any): Response<Error> => ({
  statusCode: 500,
  result: new ServerError(error instanceof Error ? error : JSON.stringify(error)),
  message: "internal",
});
