import {createAction} from '@reduxjs/toolkit';
import {MaterialDocument} from '../../shared/Types';

function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export const setGoodsMovementLog = createAction(
  'SET_GOODS_MOVEMENT_LOG',
  withPayloadType<MaterialDocument>(),
);
