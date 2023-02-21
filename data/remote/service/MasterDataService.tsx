import {MaterialResponse} from '../model/MaterialModel';
import {StorageLocationResponse} from '../model/StorageLocationModel';
import {Material, StorageLocation} from '../../../shared/Types';
import RequestGateway, {isError} from '../RequestGateway';
import {
  materialModelToMaterial,
  storageLocationModelToStorageLocation,
} from '../Mappers';

class MasterDataService {
  async getMaterials(): Promise<Material[]> {
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
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    const response = await RequestGateway.get<StorageLocationResponse>(
      '/mdata?lgort=1',
    );

    if (isError(response)) {
      return [];
    } else {
      const storageLocations: StorageLocation[] = response.result.data.map(
        item => storageLocationModelToStorageLocation(item),
      );
      return storageLocations;
    }
  }
}

export default new MasterDataService();
