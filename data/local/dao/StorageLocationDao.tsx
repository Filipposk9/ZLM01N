import {StorageLocation} from '../../../shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

class StorageLocationDao {
  async getStorageLocation(
    storageLocationNumber: string,
  ): Promise<StorageLocation | undefined> {
    const storageLocation = await BaseDao.getCopyObjectById<StorageLocation>(
      SCHEMA_NAME.STORAGE_LOCATION,
      storageLocationNumber,
    );

    if (!storageLocation) {
      return undefined;
    }

    return storageLocation;
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    return await BaseDao.getAllObjects<StorageLocation>(
      SCHEMA_NAME.STORAGE_LOCATION,
    );
  }
}

export default new StorageLocationDao();
