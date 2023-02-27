import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider, useDispatch} from 'react-redux';
import {userReducer} from './reducers/UserReducer';
import {goodsMovementLogReducer} from './reducers/GoodsMovementLogReducer';
import {goodsMovementQueueReducer} from './reducers/GoodsMovementQueueReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    goodsMovementLog: goodsMovementLogReducer,
    goodsMovementQueue: goodsMovementQueueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export function withAppStore<T>(WrappedComponent: React.FC<T> | any) {
  const ComponentWithStore = (props: T) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...(props as T)} />
      </Provider>
    );
  };

  return ComponentWithStore;
}
