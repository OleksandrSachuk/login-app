import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Email,
  Login,
  PasswordSet,
} from './types';

export const saveEmail = createAction(
  'auth/SAVE_EMAIL',
)<Email>();

export const login = createAsyncAction(
  'auth/login/REQUEST',
  'auth/login/SUCCESS',
  'auth/login/FAILURE',
)<Login, void, string>();

export const passwordReset = createAsyncAction(
  'auth/password-reset/REQUEST',
  'auth/password-reset/SUCCESS',
  'auth/password-reset/FAILURE',
)<Email, void, string>();

export const passwordSet = createAsyncAction(
  'auth/password-set/REQUEST',
  'auth/password-set/SUCCESS',
  'auth/password-set/FAILURE',
)<PasswordSet, void, string>();
