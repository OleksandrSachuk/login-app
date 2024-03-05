import { Button, TextField } from '@mui/material';
import React, {
  ChangeEvent, SyntheticEvent, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { ValidationError } from 'yup';
import { validationEmailSchema, validationLoginSchema } from '../../schemas';
import { passwordReset } from '../../actions';
import { useStyles } from './styles';
import { ForgotPasswordState } from '../../types';

export const ForgotPassword = () => {
  const classes = useStyles();
  const initialState = {
    email: '',
  };

  const [values, setValues] = useState<ForgotPasswordState>(initialState);
  const [errors, setErrors] = useState<ForgotPasswordState>(initialState);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault();

    const isFormValid = await validationEmailSchema.isValid(values.email, {
      abortEarly: false,
    });

    if (isFormValid) {
      dispatch(passwordReset.request(values.email));
    } else {
      validationLoginSchema
        .validate(values, { abortEarly: false })
        .catch((err: ValidationError) => {
          const errorsList = err.inner.reduce((acc, { path = '', message }) => ({
            ...acc,
            [path]: message,
          }), {});

          setErrors(errorsList as ForgotPasswordState);
        });
    }
  }, [
    dispatch,
    values,
  ]);

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      email: event.target.value,
    });
    setErrors(initialState);
  }, [values]);

  return (
      <div className={classes.root}>
          <p className={classes.title}>
              Forgot Password?
          </p>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
          >
              <TextField
                label="Enter your email"
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
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                fullWidth
                sx={{
                  height: '48px',
                  marginBottom: '20px',
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
                  Send
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{
                  height: '48px',
                  textTransform: 'none',
                  fontFamily: 'Basis Grotesque Pro',
                }}
                disableRipple
                disableFocusRipple
              >
                  Cancel
              </Button>
          </form>
      </div>
  );
};
