import {UserSchema} from '../data/local/schema/UserSchema';
import {User} from '../shared/Types';

export interface ActionMap<T> {
  id: string;
  value: T;
}

export interface UserState {
  user: User;
}
