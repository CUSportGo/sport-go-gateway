export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  credential: Credential;
}

class Credential {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}
