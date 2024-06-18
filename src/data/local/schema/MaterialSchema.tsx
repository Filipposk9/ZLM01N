import {SCHEMA_NAME} from '../SchemaName';

export const MaterialSchema = {
  name: SCHEMA_NAME.MATERIAL,
  primaryKey: 'materialNumber',
  properties: {
    materialNumber: 'string',
    description: 'string',
    materialGroup: 'string',
    unitOfMeasure: 'string',
  },
};
