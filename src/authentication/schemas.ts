import {
  object,
  string,
} from 'yup';

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const passwordSchema = string().required('Please enter your password').matches(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  'Password must contain at least 8 characters, one uppercase, one number and one special case character',
);

export const validationEmailSchema = string().email().required().matches(/^(?!.*@[^,]*,)/);

export const validationLoginSchema = object({
  email: validationEmailSchema,
  password: passwordSchema,
});

export const validationResetSchema = object({
  password: passwordSchema,
  password_confirm: passwordSchema,
});
