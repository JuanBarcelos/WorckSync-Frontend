export interface ILoginSuccessResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}
