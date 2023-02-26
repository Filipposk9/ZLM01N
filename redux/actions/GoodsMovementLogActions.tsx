import {createAction} from '@reduxjs/toolkit';
import {GoodsMovementLogState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setGoodsMovementLog = createAction(
  'SET_GOODS_MOVEMENT_LOG',
  withPayloadType<GoodsMovementLogState['goodsMovementLog']>(),
);
