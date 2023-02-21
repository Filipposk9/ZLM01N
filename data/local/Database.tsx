import Realm from 'realm';

import {MaterialSchema} from './schema/MaterialSchema';
import {StorageLocationSchema} from './schema/StorageLocationSchema';
import {UserSchema} from './schema/UserSchema';

class Database {
  private connection: Realm | undefined;

  async getConnection(): Promise<Realm> {
    if (!this.connection) {
      this.connection = await Realm.open({
        schema: [UserSchema, MaterialSchema, StorageLocationSchema],
      });
    }

    return this.connection;
  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

export default new Database();
