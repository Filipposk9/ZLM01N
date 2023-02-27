import UserDao from './local/dao/UserDao';
import MasterDataService from './remote/service/MasterDataService';
import ApiPostService from './remote/service/ApiPostService';
import StorageLocationDao from './local/dao/StorageLocationDao';
import MaterialDao from './local/dao/MaterialDao';
import {
  User,
  StorageLocation,
  Material,
  MaterialDocument,
  Label,
} from '../shared/Types';

class Repository {
  async getUsers(): Promise<User[] | undefined> {
    const localUsers = await UserDao.getUsers();

    if (localUsers && localUsers.length > 0) {
      return localUsers;
    }

    return undefined;
  }

  async getUser(username: string): Promise<User | undefined> {
    const localUser = await UserDao.getUser(username);

    if (localUser) {
      return localUser;
    }

    return undefined;
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    const remoteStorageLocationList =
      await MasterDataService.getStorageLocations();

    if (remoteStorageLocationList && remoteStorageLocationList.length > 0) {
      await StorageLocationDao.createStorageLocations(
        remoteStorageLocationList,
      );

      return remoteStorageLocationList;
    } else {
      const localStorageLocationList =
        await StorageLocationDao.getStorageLocations();

      return localStorageLocationList;
    }
  }

  async getMaterialBasicData(
    materialNumber: string,
  ): Promise<Material | undefined> {
    const remoteMaterialBasicData =
      await MasterDataService.getMaterialBasicData(materialNumber);

    if (remoteMaterialBasicData) {
      await MaterialDao.createMaterial(remoteMaterialBasicData);

      return remoteMaterialBasicData;
    } else {
      const localMaterialBasicData = await MaterialDao.getMaterialBasicData(
        materialNumber,
      );

      return localMaterialBasicData;
    }
  }

  async createGoodsMovement(
    goodsMovementCode: string,
    scannedLabels: Label[],
    storageLocationIn: string,
    storageLocationOut: string,
    movementType: string,
    productionOrder: string,
  ): Promise<MaterialDocument | undefined> {
    const materialDocument = await ApiPostService.createGoodsMovement(
      goodsMovementCode,
      scannedLabels,
      storageLocationIn,
      storageLocationOut,
      movementType,
      productionOrder,
    );

    if (materialDocument) {
      return materialDocument;
    }
  }
}

export default new Repository();
