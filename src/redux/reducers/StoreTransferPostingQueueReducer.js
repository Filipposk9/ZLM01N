const initialState = {
  transferPostingQueue: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_TRANSFER_POSTING_QUEUE':
      return {
        ...state,
        transferPostingQueue: [...state.transferPostingQueue, action.payload],
      };
    default:
      return state;
  }
};
