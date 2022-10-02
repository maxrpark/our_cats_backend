export interface UserTokenInt {
  _id: string;
  name: string;
  email: string;
}

interface UserInt extends UserTokenInt {
  password: string;
  verificationToken: string;
  isVerified: boolean;
  role: string;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
}

export interface UserSchemaInt extends UserInt {}
