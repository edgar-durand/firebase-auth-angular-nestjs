export interface IResponse {
  result: boolean;
  message?: string | null;
  data?: any;
  errors?: string[] | null;
}
