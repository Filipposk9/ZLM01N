import {Material, StorageLocation} from '../../shared/Types';
import {MaterialModel} from './model/MaterialModel';
import {StorageLocationModel} from './model/StorageLocationModel';

export const materialModelToMaterial = (
  materialModel: MaterialModel,
): Material => {
  return Object.freeze({
    materialNumber: materialModel.materialNumber,
    description: materialModel.description,
    materialGroup: materialModel.materialGroup,
    batch: materialModel.batch,
    quantity: materialModel.quantity,
    unitOfMeasure: materialModel.unitOfMeasure,
    plant: materialModel.plant,
    storageLocation: materialModel.storageLocation,
  } as const);
};

export const storageLocationModelToStorageLocation = (
  storageLocationModel: StorageLocationModel,
): StorageLocation => {
  return Object.freeze({
    storageLocation: storageLocationModel.STORAGELOCATION,
    description: storageLocationModel.DESCRIPTION,
  });
};
