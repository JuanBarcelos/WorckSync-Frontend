export interface IAuthSuccessResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
