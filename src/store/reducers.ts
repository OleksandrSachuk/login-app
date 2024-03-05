import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { AuthReducer } from '../authentication/reducer';

export const reducers = combineReducers({
  auth: AuthReducer,
});

export type AppState = StateType<typeof reducers>;
