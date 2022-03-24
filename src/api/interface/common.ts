export enum APIResponseStatus {
  success = 'success',
  fail = 'fail',
}

export interface APIResponse {
  status: APIResponseStatus;
  message?: string;
}