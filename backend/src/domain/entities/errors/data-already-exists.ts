export class DataAlreadyExistsError extends Error {
  public errorDetails?: unknown;
  constructor(details?: unknown) {
    super("DATA.ALREADY.EXIST.ERROR");
    this.name = "DataAlreadyExistsError";
    this.errorDetails = details;
  }
}
