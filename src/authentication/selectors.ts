import { createSelector } from 'reselect';
import { AppState } from '../store/reducers';

export const selectAuth = ({ auth }: AppState) => auth;
export const selectEmail = createSelector(
  selectAuth,
  ({ email }) => email,
);
