import {createAction} from '@reduxjs/toolkit';
import {UserState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setCurrentUser = createAction(
  'USER_SET_CURRENT',
  withPayloadType<UserState['user']>(),
);
