import Realm from 'realm';

import {MaterialSchema} from './schema/MaterialSchema';
import {StorageLocationSchema} from './schema/StorageLocationSchema';
import {UserSchema} from './schema/UserSchema';
import {SCHEMA_NAME} from './SchemaName';

class Database {
  private connection: Realm | undefined;

  async getConnection(): Promise<Realm> {
    if (!this.connection) {
      this.connection = await Realm.open({
        schema: [UserSchema, MaterialSchema, StorageLocationSchema],
        deleteRealmIfMigrationNeeded: true,
        path: 'bundle.realm',
      });

      this.connection.write(() => {
        if (this.connection !== undefined) {
          this.connection.create(
            SCHEMA_NAME.USER,
            {
              username: 'FILKOZ',
              password: 'COMPO2SITION4',
            },
            'modified',
          );
        }
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
