import {MaterialResponse} from '../model/MaterialModel';
import {StorageLocationResponse} from '../model/StorageLocationModel';
import {Material, StorageLocation} from '../../../src/shared/Types';
import RequestGateway, {isError} from '../RequestGateway';
import {
  materialModelToMaterial,
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
}

export default new MasterDataService();
