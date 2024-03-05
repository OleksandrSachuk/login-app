import axios, { AxiosResponse } from 'axios';
import {
  Email,
  PasswordSet,
  Login,
} from './types';
import {
  PASSWORD_RESET_URL,
  LOGIN_URL,
  PASSWORD_SET_URL,
} from './url';

export const loginApiRequest = async (data: Login): Promise<any> => {
  const response: AxiosResponse = await axios.post(
    LOGIN_URL,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};

export const passwordResetRequest = async (email: Email): Promise<any> => {
  const response: AxiosResponse = await axios.post(
    PASSWORD_RESET_URL,
    {
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};

export const passwordSetRequest = async (data: PasswordSet): Promise<any> => {
  const response: AxiosResponse = await axios.post(
    PASSWORD_SET_URL,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
