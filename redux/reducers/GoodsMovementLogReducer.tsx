import {createReducer} from '@reduxjs/toolkit';
import {GoodsMovementLogState} from '../ReduxTypes';
import {setGoodsMovementLog} from '../actions/GoodsMovementLogActions';

const initialState: GoodsMovementLogState = {goodsMovementLog: []};

export const goodsMovementLogReducer = createReducer(initialState, builder => {
  builder.addCase(setGoodsMovementLog, (state, action) => {
    if (state.goodsMovementLog) {
      return {
        ...state,
        goodsMovementLog: action.payload,
      };
    }
    state.goodsMovementLog = action.payload;
    return state;
  });
});
