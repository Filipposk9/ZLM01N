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
import SapRequestParameters from '../SapRequestParameters';

class MasterDataService {
  async getStorageLocations(): Promise<StorageLocation[]> {
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<StorageLocationResponse>(
      '/mdata?lgort=1',
      sapRequestHeaders,
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
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.get<MaterialResponse>(
      '/mdata?matnr=' + materialNumber,
      sapRequestHeaders,
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
    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();
    const response = await RequestGateway.get<OutboundDeliveryResponse>(
      '/mdata?vbeln=' + outboundDeliveryNumber,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return outboundDeliveryModelToOutboundDelivery(response.result.data);
    }
  }
}

export default new MasterDataService();
