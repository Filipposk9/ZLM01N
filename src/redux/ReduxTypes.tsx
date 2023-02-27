import {User} from '../shared/Types';
import {MaterialDocument, GoodsMovement} from '../shared/Types';

export interface ActionMap<T> {
  id: string;
  value: T;
}

export interface UserState {
  user: User;
}

export interface GoodsMovementLogState {
  goodsMovementLog: MaterialDocument[];
}

export interface GoodsMovementQueueState {
  goodsMovementQueue: GoodsMovement[];
}
