import {createStore, combineReducers} from 'redux';
import StoreGoodsMovementLogReducer from './reducers/StoreGoodsMovementLogReducer.js';

const rootReducer = combineReducers({
  goodsMovementLogArray: StoreGoodsMovementLogReducer,
});
//TODO: fix deprecated createStore();
export const Store = createStore(rootReducer);
