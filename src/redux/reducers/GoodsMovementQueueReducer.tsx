import {createReducer} from '@reduxjs/toolkit';
import {GoodsMovementQueueState} from '../ReduxTypes';
import {
  setGoodsMovementQueue,
  resetGoodsMovementQueue,
} from '../actions/GoodsMovementQueueActions';

const initialState: GoodsMovementQueueState = {goodsMovementQueue: []};

export const goodsMovementQueueReducer = createReducer(
  initialState,
  builder => {
    builder.addCase(setGoodsMovementQueue, (state, action) => {
      if (state.goodsMovementQueue) {
        return {
          ...state,
          goodsMovementQueue: state.goodsMovementQueue.concat(action.payload),
        };
      }
    });

    builder.addCase(resetGoodsMovementQueue, () => {
      return initialState;
    });
  },
);
