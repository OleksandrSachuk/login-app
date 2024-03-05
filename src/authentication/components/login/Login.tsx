import {
  Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import React, {
  ChangeEvent, SyntheticEvent, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ValidationError } from 'yup';
import { login } from '../../actions';
import { validationLoginSchema } from '../../schemas';
import { useStyles } from './styles';
import googleLogo from '../../assets/google.png';
import githubLogo from '../../assets/github.png';
import divider from '../../assets/divider.png';
import { LoginState } from '../../types';

export const Login = () => {
  const classes = useStyles();
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const initialState = {
    email: '',
    password: '',
  };

  const [values, setValues] = useState<LoginState>(initialState);
  const [errors, setErrors] = useState<LoginState>(initialState);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!isShowPasswordInput) {
      setIsShowPasswordInput(true);
      return;
    }

    const isFormValid = await validationLoginSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      dispatch(login.request(values));
    } else {
      validationLoginSchema
        .validate(values, { abortEarly: false })
        .catch((err: ValidationError) => {
          const errorsList = err.inner.reduce((acc, { path = '', message }) => ({
            ...acc,
            [path]: message,
          }), {});

          setErrors(errorsList as LoginState);
        });
    }
  }, [
    dispatch,
    values,
    isShowPasswordInput,
  ]);

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      email: event.target.value,
    });
    setErrors(initialState);
  }, [values]);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: event.target.value,
    });
    setErrors(initialState);
  }, [values]);

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
      <div className={classes.root}>
          <p className={classes.title}>
              Log in to your account
          </p>
          <div className={classes.socialLogo}>
              <img
                src={googleLogo}
                alt="googleLogo"
              />
              <img
                src={githubLogo}
                alt="githubLogo"
              />
          </div>
          <div className={classes.divider}>
              <img
                src={divider}
                alt="divider"
              />
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
              <TextField
                label="Work email"
                onChange={onEmailChange}
                required
                variant="outlined"
                color="secondary"
                type="email"
                fullWidth
                value={values.email}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  width: '400px',
                  marginBottom: '25px',
                }}
                inputProps={{
                  style: {
                    height: '17px',
                  },
                }}
              />
              {isShowPasswordInput && (
                  <>
                      <TextField
                        label="Password"
                        onChange={onPasswordChange}
                        required
                        variant="outlined"
                        color="secondary"
                        type={isShowPassword ? 'text' : 'password'}
                        value={values.password}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        fullWidth
                        sx={{
                          height: '48px',
                          marginBottom: '10px',
                        }}
                        InputProps={{
                          style: { height: '48px' },
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                              </InputAdornment>
                          ),
                        }}
                      />
                      <div className={classes.forgotPassword}>
                          <Link
                            className={classes.forgotPasswordLink}
                            to="/forgot-password"
                          >
                              Forgot your password?
                          </Link>
                      </div>
                  </>
              )}
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                fullWidth
                sx={{
                  height: '48px',
                  backgroundColor: '#316fea',
                  textTransform: 'none',
                  color: '#ffffff',
                  fontFamily: 'Basis Grotesque Pro',
                  '&.MuiButtonBase-root:hover': {
                    backgroundColor: '#316fea',
                  },
                }}
                disableRipple
                disableFocusRipple
              >
                  Log in to Qencode
              </Button>
          </form>
          <p className={classes.signUp}>
              Is your company new to Qencode?
              <Link
                className={classes.signUpLink}
                to="/sign-up"
              >
                  Sign up
              </Link>
          </p>
      </div>
  );
};
