import {User} from '../../../shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

class UserDao {
  async getUser(username: string): Promise<User | undefined> {
    const user = await BaseDao.getCopyObjectById<User>(
      SCHEMA_NAME.USER,
      username,
    );
    if (!user) {
      return undefined;
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await BaseDao.getAllObjects<User>(SCHEMA_NAME.USER);
  }

  async setUser(user: User) {
    BaseDao.createObject(SCHEMA_NAME.USER, user);
  }
}

export default new UserDao();
