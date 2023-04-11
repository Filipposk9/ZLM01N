import {MaterialResponse} from '../model/MaterialModel';
import {StorageLocationResponse} from '../model/StorageLocationModel';
import {OutboundDeliveryResponse} from '../model/OutboundDeliveryModel';
import {ProductionOrderResponse} from '../model/ProductionOrderModel';
import {
  Batch,
  Material,
  OutboundDelivery,
  ProductionOrder,
  StorageLocation,
  iTankCharacteristics,
  User,
} from '../../../shared/Types';
import RequestGateway, {isError} from '../RequestGateway';
import {
  batchModelToBatch,
  materialModelToMaterial,
  outboundDeliveryModelToOutboundDelivery,
  productionOrderModelToProductionOrder,
  storageLocationModelToStorageLocation,
  tankCharacteristicsModelToTankCharacteristics,
  tankModelToTank,
  userModelToUser,
} from '../Mappers';
import SapRequestParameters from '../SapRequestParameters';
import {BatchResponse} from '../model/BatchModel';
import {UserResponse} from '../model/UserModel';
import {TankCharacteristicsResponse} from '../model/TankCharacteristicsModel';
import {TankResponse} from '../model/TankModel';

class MasterDataService {
  async setSapCredentials(
    username: string,
    password: string,
  ): Promise<boolean | undefined> {
    const response = await SapRequestParameters.setSapCredentials(
      username,
      password,
    );
    if (response !== undefined) {
      return true;
    } else {
      return undefined;
    }
  }

  async getUser(username: string): Promise<User | undefined> {
    const timeout = 5000;
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders(
      timeout,
    );

    if (sapRequestHeaders) {
      const response = await RequestGateway.get<UserResponse>(
        '/users?bname=' + username,
        sapRequestHeaders,
      );

      if (isError(response)) {
        return undefined;
      } else {
        return userModelToUser(response.result.data);
      }
    }
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    const timeout = 5000;
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders(
      timeout,
    );

    if (sapRequestHeaders) {
      const response = await RequestGateway.get<StorageLocationResponse>(
        '/storagelocations?lgort=1',
        sapRequestHeaders,
      );

      if (isError(response)) {
        return [];
      } else {
        return response.result.data.map(item =>
          storageLocationModelToStorageLocation(item),
        );
      }
    } else {
      return [];
    }
  }

  async getStorageLocation(
    storageLocation: string,
  ): Promise<StorageLocation | undefined> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<StorageLocationResponse>(
      '/storagelocations?lgort=' + storageLocation,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return storageLocationModelToStorageLocation(response.result.data[0]);
    }
  }

  async getMaterialBasicData(
    materialNumber: string,
  ): Promise<Material | undefined> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<MaterialResponse>(
      '/materials?matnr=' + materialNumber,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return materialModelToMaterial(response.result.data[0]);
    }
  }

  async getMaterials(): Promise<Material[] | undefined> {
    const timeout = 5000;
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders(
      timeout,
    );

    if (sapRequestHeaders) {
      const response = await RequestGateway.get<MaterialResponse>(
        '/materials?matnr=1',
        sapRequestHeaders,
      );

      if (isError(response)) {
        return [];
      } else {
        return response.result.data.map(item => materialModelToMaterial(item));
      }
    } else {
      return [];
    }
  }

  async getBatchData(
    materialNumber: string,
    batch: string,
    storageLocation: string,
  ): Promise<Batch | undefined> {
    const timeout = 5000;
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders(
      timeout,
    );

    if (sapRequestHeaders) {
      const response = await RequestGateway.get<BatchResponse>(
        '/materials?matnr=' +
          materialNumber +
          '&charg=' +
          batch +
          '&lgortIn=' +
          storageLocation,
        sapRequestHeaders,
      );

      if (isError(response)) {
        return undefined;
      } else {
        return batchModelToBatch(response.result.data);
      }
    } else {
      return undefined;
    }
  }

  async getOutboundDelivery(
    outboundDeliveryNumber: string,
  ): Promise<OutboundDelivery | undefined> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<OutboundDeliveryResponse>(
      '/deliveries?vbeln=' + outboundDeliveryNumber,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return outboundDeliveryModelToOutboundDelivery(response.result.data);
    }
  }

  async getProductionOrder(
    productionOrderNumber: string,
  ): Promise<ProductionOrder | undefined> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<ProductionOrderResponse>(
      '/productionorders?aufnr=' + productionOrderNumber,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return productionOrderModelToProductionOrder(response.result.data);
    }
  }

  async getTankCharacteristics(
    tank: string,
  ): Promise<iTankCharacteristics | undefined> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<TankCharacteristicsResponse>(
      '/tanks?tank=' + tank,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return tankCharacteristicsModelToTankCharacteristics(
        response.result.data,
      );
    }
  }

  async getTanks() {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<TankResponse>(
      '/tanks?tank=1',
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return response.result.data.map(item => tankModelToTank(item));
    }
  }
}

export default new MasterDataService();
