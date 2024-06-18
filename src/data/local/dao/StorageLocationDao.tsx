import {StorageLocation} from '../../../shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

class StorageLocationDao {
  async getStorageLocation(
    storageLocation: string,
  ): Promise<StorageLocation | undefined> {
    return await BaseDao.getCopyObjectById<StorageLocation>(
      SCHEMA_NAME.STORAGE_LOCATION,
      storageLocation,
    );
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    return await BaseDao.getAllObjects<StorageLocation>(
      SCHEMA_NAME.STORAGE_LOCATION,
    );
  }

  async createStorageLocations(storageLocation: StorageLocation[]) {
    BaseDao.createObjects(SCHEMA_NAME.STORAGE_LOCATION, storageLocation);
  }

  async createStorageLocation(storageLocation: StorageLocation) {
    BaseDao.createObject(SCHEMA_NAME.STORAGE_LOCATION, storageLocation);
  }
}

export default new StorageLocationDao();
