import {SCHEMA_NAME} from '../SchemaName';

export const StorageLocationSchema = {
  name: SCHEMA_NAME.STORAGE_LOCATION,
  primaryKey: 'storageLocation',
  properties: {
    storageLocation: 'string',
    description: 'string',
  },
};
