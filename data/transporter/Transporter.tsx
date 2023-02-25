import React from 'react';

import Database from '../local/Database';
import {SCHEMA_NAME} from '../local/SchemaName';
import {StorageLocation} from '../../shared/Types';

class Transporter {
  async transport(storageLocationList: StorageLocation[]) {
    const db = await Database.getConnection();

    if (db) {
      db.write(() => {
        storageLocationList.map((item: StorageLocation) => {
          db.create(
            SCHEMA_NAME.STORAGE_LOCATION,
            {
              storageLocation: item.storageLocation,
              description: item.description,
            },
            'modified',
          );
        });
      });
    }
  }
}

export default new Transporter();
