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
  async initLocalDB(): Promise<void> {
    const remoteMaterialList = await MasterDataService.getMaterials();

    if (remoteMaterialList && remoteMaterialList.length > 0) {
      await MaterialDao.createMaterials(remoteMaterialList);
    }

    const users = {username: 'FILKOZ', password: 'COMPO2SITION4'};

    await UserDao.setUser(users);
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
    //switch priority check local length 0
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
