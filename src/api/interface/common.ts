export enum APIResponseStatus {
  Success = 'success',
  Error = 'error',
  FormatError = 'formatError',
  TokenError = 'tokenError',
  PermissionError = 'permissionError',
  OperationError = 'operationError',
  ServerError = 'serverError',
}

export interface APIResponse<D = unknown> {
  status: APIResponseStatus;
  result?: D;
  message?: string;
  trace?: string;
}