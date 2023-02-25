import {Material, StorageLocation} from '../../shared/Types';
import {MaterialModel} from './model/MaterialModel';
import {StorageLocationModel} from './model/StorageLocationModel';

export const materialModelToMaterial = (
  materialModel: MaterialModel,
): Material => {
  return Object.freeze({
    materialNumber: materialModel.MATERIALNUMBER,
    description: materialModel.DESCRIPTION,
    materialGroup: materialModel.MATERIALGROUP,
    unitOfMeasure: materialModel.UNITOFMEASURE,
  });
};

export const storageLocationModelToStorageLocation = (
  storageLocationModel: StorageLocationModel,
): StorageLocation => {
  return Object.freeze({
    storageLocation: storageLocationModel.STORAGELOCATION,
    description: storageLocationModel.DESCRIPTION,
  });
};
