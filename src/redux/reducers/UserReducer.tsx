import {createReducer} from '@reduxjs/toolkit';
import {UserState} from '../ReduxTypes';
import {setCurrentUser} from '../actions/UserActions';

const initialState: UserState = {
  user: {username: '', password: '', buildingCode: ''},
};

export const userReducer = createReducer(initialState, builder => {
  builder.addCase(setCurrentUser, (state, action) => {
    if (state.user.username !== '') {
      return state;
    }
    state.user = action.payload;
    return state;
  });
});
