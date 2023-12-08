export class NoDataFoundError extends Error {
  public errorDetails?: unknown;
  constructor( details?: unknown) {
    super("NO.DATA.FOUND.ERROR");
    this.name = "NoDataFoundError";
    this.errorDetails = details;
  }
}
