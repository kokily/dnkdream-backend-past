export type TokenType = {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
};

export type AccessTokenType = {
  user_id: string;
  username: string;
} & TokenType;

export type RefreshTokenType = {
  token_id: string;
} & AccessTokenType;
