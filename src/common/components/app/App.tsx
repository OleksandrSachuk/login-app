import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ForgotPassword } from '../../../authentication/components/forgotPassword/ForgotPassword';
import { Login } from '../../../authentication/components/login/Login';
import { ResetPassword } from '../../../authentication/components/resetPassword/ResetPassword';
import { Layout } from '../layout/Layout';
import { useStyles } from './styles';

export const App = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <Layout>
              <Routes>
                  <Route index path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
          </Layout>
      </div>
  );
};

export default App;
