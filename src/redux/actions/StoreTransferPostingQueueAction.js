export const storeQueue = transferPostingQueue => {
  return {
    type: 'STORE_TRANSFER_POSTING_QUEUE',
    payload: transferPostingQueue,
  };
};
