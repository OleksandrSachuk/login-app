import { ResponseError } from './types';

export const getErrorMessage = (error: ResponseError) => error?.detail;
