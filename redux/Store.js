import {createStore, combineReducers} from 'redux';
import StoreGoodsMovementLogReducer from './reducers/StoreGoodsMovementLogReducer.js';
import StoreTransferPostingQueueReducer from './reducers/StoreTransferPostingQueueReducer.js';

const rootReducer = combineReducers({
  goodsMovementLogArray: StoreGoodsMovementLogReducer,
  transferPostingQueue: StoreTransferPostingQueueReducer,
});
//TODO: fix deprecated createStore();
export const Store = createStore(rootReducer);
