import {MaterialResponse} from '../model/MaterialModel';
import {StorageLocationResponse} from '../model/StorageLocationModel';
import {OutboundDeliveryResponse} from '../model/OutboundDeliveryModel';
import {
  Material,
  OutboundDelivery,
  StorageLocation,
} from '../../../shared/Types';
import RequestGateway, {isError} from '../RequestGateway';
import {
  materialModelToMaterial,
  outboundDeliveryModelToOutboundDelivery,
  storageLocationModelToStorageLocation,
} from '../Mappers';

class MasterDataService {
  /*async getMaterials(): Promise<Material[]> {
    const response = await RequestGateway.get<MaterialResponse>(
      '/mdata?matnr=1&charg=&menge=&lgort_in=',
    );

    if (isError(response)) {
      return [];
    } else {
      const materials: Material[] = response.result.data.map(item =>
        materialModelToMaterial(item),
      );

      return materials;
    }
  }*/

  async getStorageLocations(): Promise<StorageLocation[]> {
    const response = await RequestGateway.get<StorageLocationResponse>(
      '/mdata?lgort=1',
    );

    if (isError(response)) {
      return [];
    } else {
      return response.result.data.map(item =>
        storageLocationModelToStorageLocation(item),
      );
    }
  }

  async getMaterialBasicData(
    materialNumber: string,
  ): Promise<Material | undefined> {
    const response = await RequestGateway.get<MaterialResponse>(
      '/mdata?matnr=' + materialNumber,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return materialModelToMaterial(response.result.data);
    }
  }

  async getOutboundDelivery(
    outboundDeliveryNumber: string,
  ): Promise<OutboundDelivery | undefined> {
    const response = await RequestGateway.get<OutboundDeliveryResponse>(
      '/mdata?vbeln=' + outboundDeliveryNumber,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return outboundDeliveryModelToOutboundDelivery(response.result.data);
    }
  }
}

export default new MasterDataService();
