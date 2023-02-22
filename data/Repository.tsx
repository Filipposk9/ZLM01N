import UserDao from './local/dao/UserDao';
import BaseDao from './local/dao/BaseDao';
import {User} from '../shared/Types';
import {UserSchema} from './local/schema/UserSchema';

class Repository {
  async getUsers(): Promise<User[] | undefined> {
    const localUsers = await UserDao.getUsers();

    if (localUsers && localUsers.length > 0) {
      return localUsers;
    }

    return undefined;
  }

  async getUser(username: string): Promise<User | undefined> {
    const localUser = await UserDao.getUser(username);

    if (localUser) {
      return localUser;
    }

    return undefined;
  }
}

export default new Repository();
