import {SCHEMA_NAME} from '../SchemaName';

export const UserSchema = {
  name: SCHEMA_NAME.USER,
  primaryKey: 'username',
  properties: {
    username: 'string',
    password: 'string',
  },
};
