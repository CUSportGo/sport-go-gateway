export class LoginRequestDto {
  email: string;
  password: string;
}

export class LoginResponseDto {
  credential: Credential;
}

export class RegisterRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
}

export class RegisterResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

class Credential {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}
