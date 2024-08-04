export interface IDecodedToken {
  email: string;
  schoolId: number;
  role: string;
  name: string;
  sub: number;
}

export interface IDecodedRefreshToken {
  sub: number;
}
