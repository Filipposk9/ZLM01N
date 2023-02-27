import {User} from '../src/shared/Types';
import {MaterialDocument} from '../src/shared/Types';

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
