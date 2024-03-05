import { all } from 'typed-redux-saga';
import { watchAuth } from '../authentication/saga';

export function* rootSaga() {
  yield all([
    watchAuth(),
  ]);
}
