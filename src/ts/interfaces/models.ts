import { UserTokenInt } from "./globalInterfaces";

interface UserInt extends UserTokenInt {
  password: string;
  verificationToken: string;
  isVerified: boolean;
  email: string;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
}

export interface UserSchemaInt extends UserInt {
  comparePassword(candidatePassword: string): Promise<Boolean>;
  save(): any;
}

export interface TokenInt {
  _id?: string;
  refreshToken: string;
  userAgent: string;
  ip: string;
  user: UserInt;
  isValid: Boolean;
}
