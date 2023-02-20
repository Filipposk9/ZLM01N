import {Realm, createRealmContext, AppProvider} from '@realm/react';

export class User extends Realm.Object {
  static generate(description: string) {
    return {
      username: description,
      password: 'COMPO2SITION4',
    };
  }

  static schema = {
    name: 'User',
    primaryKey: 'username',
    properties: {
      username: 'string',
      password: 'string',
    },
  };
}

export class StorageLocation extends Realm.Object {
  static generate(stgLoc: string, dscr: string) {
    return {
      storageLocation: stgLoc,
      description: dscr,
    };
  }

  static schema = {
    name: 'StorageLocation',
    primaryKey: 'storageLocation',
    properties: {
      storageLocation: 'string',
      description: 'string',
    },
  };
}

export class MaterialText extends Realm.Object {
  static generate(matnr: String, maktx: string) {
    return {
      materialNumber: matnr,
      materialText: maktx,
    };
  }

  static schema = {
    name: 'MaterialText',
    primaryKey: 'materialNumber',
    properties: {
      materialNumber: 'string',
      materialText: 'string',
    },
  };
}

//TODO: check config opts

const config = {
  schema: [User, StorageLocation, MaterialText],
  deleteRealmIfMigrationNeeded: true,
};

export default createRealmContext(config);
