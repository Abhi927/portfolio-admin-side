export interface AuthResponse {
  token: string;
  expiresIn?: number;
  username?: string;
  email?: string;
}
