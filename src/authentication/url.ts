import { BASE_URL } from '../common/commonUrl';

export const AUTH_URL = `${BASE_URL}/v1/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const PASSWORD_RESET_URL = `${AUTH_URL}/password-reset`;
export const PASSWORD_SET_URL = `${AUTH_URL}/password-set`;
