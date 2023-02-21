import {UserSchema} from './schema/UserSchema';
import {MaterialSchema} from './schema/MaterialSchema';
import {StorageLocationSchema} from './schema/StorageLocationSchema';
import {SCHEMA_NAME} from './SchemaName';

export const NAME_TO_SCHEMA = {
  [SCHEMA_NAME.USER]: UserSchema,
  [SCHEMA_NAME.MATERIAL]: MaterialSchema,
  [SCHEMA_NAME.STORAGE_LOCATION]: StorageLocationSchema,
};
