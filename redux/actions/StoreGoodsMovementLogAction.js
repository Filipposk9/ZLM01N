export const storeLog = goodsMovementLog => {
  return {
    type: 'STORE_GOODS_MOVEMENT_LOG',
    payload: goodsMovementLog,
  };
};
