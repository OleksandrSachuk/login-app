import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Basis Grotesque Pro',
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
  },
  socialLogo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  divider: {
    marginBottom: 30,
  },
  textField: {
    height: 48,
    marginBottom: 25,
  },
  signUp: {
    fontSize: 15,
    color: '#060e1e',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 30,
    marginBottom: 25,
  },
  forgotPasswordLink: {
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    color: '#316fea',
  },
  signUpLink: {
    cursor: 'pointer',
    marginLeft: 4,
    textDecoration: 'none',
  },
});
