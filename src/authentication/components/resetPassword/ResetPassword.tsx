import {
  Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import React, {
  ChangeEvent, SyntheticEvent, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ValidationError } from 'yup';
import { passwordSet } from '../../actions';
import { validationResetSchema } from '../../schemas';
import { useStyles } from './styles';
import { ResetPasswordState } from '../../types';

export const ResetPassword = () => {
  const classes = useStyles();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const initialState = {
    password: '',
    password_confirm: '',
  };

  const [values, setValues] = useState<ResetPasswordState>(initialState);
  const [errors, setErrors] = useState<ResetPasswordState>(initialState);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();

    const isFormValid = await validationResetSchema.isValid(values, {
      abortEarly: false,
    });

    if (isFormValid) {
      dispatch(passwordSet.request({
        token: '',
        secret: '',
        ...values,
      }));
    } else {
      validationResetSchema
        .validate(values, { abortEarly: false })
        .catch((err: ValidationError) => {
          const errorsList = err.inner.reduce((acc, { path = '', message }) => ({
            ...acc,
            [path]: message,
          }), {});

          setErrors(errorsList as ResetPasswordState);
        });
    }
  }, [
    dispatch,
    values,
  ]);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: event.target.value,
    });
    setErrors(initialState);
  }, [values]);

  const onPasswordConfirmChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password_confirm: event.target.value,
    });
    setErrors(initialState);
  }, [values]);

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setIsShowPasswordConfirm(!isShowPasswordConfirm);
  };

  return (
      <div className={classes.root}>
          <p className={classes.title}>
              Create new Password?
          </p>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
                  marginBottom: '50px',
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
              <TextField
                label="Confirm Password"
                onChange={onPasswordConfirmChange}
                required
                variant="outlined"
                color="secondary"
                type={isShowPasswordConfirm ? 'text' : 'password'}
                value={values.password_confirm}
                error={Boolean(errors.password_confirm)}
                helperText={errors.password_confirm}
                fullWidth
                sx={{
                  height: '48px',
                  marginBottom: '50px',
                }}
                InputProps={{
                  style: { height: '48px' },
                  endAdornment: (
                      <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirm}
                            edge="end"
                          >
                              {isShowPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                  ),
                }}
              />
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
                  Reset Password
              </Button>
          </form>
      </div>
  );
};
