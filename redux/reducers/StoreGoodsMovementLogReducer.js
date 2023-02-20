const initialState = {
  goodsMovementLogArray: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_GOODS_MOVEMENT_LOG':
      return {
        ...state,
        goodsMovementLogArray: [...state.goodsMovementLogArray, action.payload],
      };
    default:
      return state;
  }
};
