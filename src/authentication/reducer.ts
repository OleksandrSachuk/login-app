import { ActionType, getType } from 'typesafe-actions';
import { LoadingState } from '../common/types';
import * as actions from './actions';
import { AuthState } from './types';

type Actions = ActionType<typeof actions>;

export const initialState: AuthState = {
  email: undefined,
  passwordReset: {
    loading: LoadingState.IDLE,
  },
  passwordSet: {
    loading: LoadingState.IDLE,
  },
};

function toggleLoading(pageState: AuthState, key: string, state: LoadingState, info?: string):
AuthState {
  return {
    ...pageState,
    [key]: {
      loading: {
        state,
        info,
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/default-param-last
export function AuthReducer(state: AuthState = initialState, action: Actions): AuthState {
  switch (action.type) {
    case getType(actions.saveEmail):
      return {
        ...state,
        email: action.payload,
      };

    case getType(actions.passwordSet.request):
      return toggleLoading(state, 'passwordSet', LoadingState.REQUEST);
    case getType(actions.passwordSet.success):
      return toggleLoading(state, 'passwordSet', LoadingState.SUCCESS);
    case getType(actions.passwordSet.failure):
      return toggleLoading(state, 'passwordSet', LoadingState.FAILURE);

    case getType(actions.passwordReset.request):
      return toggleLoading(state, 'passwordReset', LoadingState.REQUEST);
    case getType(actions.passwordReset.success):
      return toggleLoading(state, 'passwordReset', LoadingState.SUCCESS);
    case getType(actions.passwordReset.failure):
      return toggleLoading(state, 'passwordReset', LoadingState.FAILURE);

    default:
      return state;
  }
}
