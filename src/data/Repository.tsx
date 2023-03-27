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
  OutboundDelivery,
  Picking,
  ProductionOrder,
  Batch,
} from '../shared/Types';

class Repository {
  async initLocalDB(
    username: string,
    password: string,
  ): Promise<boolean | undefined> {
    const response = await MasterDataService.setSapCredentials(
      username,
      password,
    );

    if (response !== undefined) {
      const remoteMaterialList = await MasterDataService.getMaterials();

      if (remoteMaterialList && remoteMaterialList.length > 0) {
        await MaterialDao.createMaterials(remoteMaterialList);
      }

      const remoteStorageLocationList =
        await MasterDataService.getStorageLocations();

      if (remoteStorageLocationList && remoteStorageLocationList.length > 0) {
        await StorageLocationDao.createStorageLocations(
          remoteStorageLocationList,
        );
      }

      await UserDao.setUser({username: username, password: password});
      return true;
    } else {
      return undefined;
    }
  }

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

  async getStorageLocation(
    storageLocation: string,
  ): Promise<StorageLocation | undefined> {
    const localStorageLocation = await StorageLocationDao.getStorageLocation(
      storageLocation,
    );

    if (localStorageLocation) {
      return localStorageLocation;
    } else {
      const remoteStorageLocation = await MasterDataService.getStorageLocation(
        storageLocation,
      );

      if (remoteStorageLocation) {
        return remoteStorageLocation;
      }
    }
  }

  async getMaterialBasicData(
    materialNumber: string,
  ): Promise<Material | undefined> {
    const localMaterialBasicData = await MaterialDao.getMaterialBasicData(
      materialNumber,
    );

    if (localMaterialBasicData) {
      return localMaterialBasicData;
    } else {
      const remoteMaterialBasicData =
        await MasterDataService.getMaterialBasicData(materialNumber);

      if (remoteMaterialBasicData) {
        return remoteMaterialBasicData;
      }
    }
  }

  async getBatchData(
    materialNumber: string,
    batch: string,
    storageLocation: string,
  ): Promise<Batch | undefined> {
    const batchData = await MasterDataService.getBatchData(
      materialNumber,
      batch,
      storageLocation,
    );

    if (batchData) {
      return batchData;
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

  async getOutboundDelivery(
    outboundDeliveryNumber: string,
  ): Promise<OutboundDelivery | undefined> {
    const outboundDelivery = await MasterDataService.getOutboundDelivery(
      outboundDeliveryNumber,
    );

    if (outboundDelivery) {
      return outboundDelivery;
    }
  }

  async createPickingRequest(
    outboundDeliveryNumber: string,
    sscc: string,
  ): Promise<Picking | undefined> {
    const picking = await ApiPostService.createPickingRequest(
      outboundDeliveryNumber,
      sscc,
    );

    if (picking) {
      return picking;
    }
  }

  async getProductionOrder(
    productionOrderNumber: string,
  ): Promise<ProductionOrder | undefined> {
    const productionOrder = await MasterDataService.getProductionOrder(
      productionOrderNumber,
    );

    if (productionOrder) {
      return productionOrder;
    }
  }
}

export default new Repository();
