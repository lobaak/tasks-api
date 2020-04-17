export interface JwtPayload {
  email: string;
  id: string;
  tokenVersion?: number;
}

export interface AccessToken {
  accessToken: string;
}
