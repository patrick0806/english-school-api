export interface IDecodedToken {
  email: string;
  schoolId: number;
  role: string;
  sub: number;
}

export interface IDecodedRefreshToken {
  sub: number;
}
