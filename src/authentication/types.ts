import { LoadingState } from '../common/types';

export type Email = string;

export type AuthState = {
  email?: Email;
  passwordReset: {
    loading: LoadingState
  },
  passwordSet: {
    loading: LoadingState
  }
};

export type Login = {
  email: Email;
  password: string;
};

export type PasswordSet = {
  token: string;
  secret: string;
  password: string;
  password_confirm: string;
};

export type ResponseError = {
  error: number;
  detail: string;
  timestamp: number;
};

export type LoginState = {
  email: string;
  password: string;
};

export type ForgotPasswordState = {
  email: string;
};

export type ResetPasswordState = {
  password: string;
  password_confirm: string;
};
