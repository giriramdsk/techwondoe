export class LoginDto {
  username: string;
  password: string;
  exp?: any;
}
export class LoginResponseDto {
  description: string;
  token: string;
}
export interface JwtPayload {
  username: string;
  roles: string[];
}
