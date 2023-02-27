import {createAction} from '@reduxjs/toolkit';
import {GoodsMovementQueueState} from '../ReduxTypes';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setGoodsMovementQueue = createAction(
  'SET_GOODS_MOVEMENT_QUEUE',
  withPayloadType<GoodsMovementQueueState['goodsMovementQueue']>(),
);

export const resetGoodsMovementQueue = createAction(
  'RESET_GOODS_MOVEMENT_QUEUE',
);
