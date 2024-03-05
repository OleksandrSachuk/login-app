import React, { FC, ReactNode } from 'react';
import logo from '../../../authentication/assets/logo.png';
import { useStyles } from './styles';

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <div className={classes.logo}>
              <img
                src={logo}
                alt="logo"
              />
          </div>
          <div>{children}</div>
      </div>
  );
};
