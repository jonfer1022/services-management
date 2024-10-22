import { Request } from 'express';

export type RequestAuth = Request & {
  user: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    token?: string;
    refreshToken?: string;
  };
};
