import {UserSchema} from '../schema/UserSchema';
import {User} from '../../../shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

class UserDao {
  async getUser(username: string) {
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
}

export default new UserDao();
