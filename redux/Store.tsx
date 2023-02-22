import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider, useDispatch} from 'react-redux';
import {createLogger} from 'redux-logger';

//import {userReducer} from './reducers/UserReducer';

const logger = createLogger({
  level: {
    prevState: false,
    nextState: false,
  },
});

export const store = configureStore({
  reducer: {
    //user: userReducer,
  },
  middleware: defaultMiddleware =>
    defaultMiddleware({serializableCheck: false}).concat(logger),
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
