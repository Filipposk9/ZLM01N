import {
  Material,
  StorageLocation,
  GoodsMovement,
  GoodsMovementItem,
  MaterialDocument,
  MaterialDocumentItem,
  Label,
} from '../../shared/Types';
import {MaterialModel} from './model/MaterialModel';
import {StorageLocationModel} from './model/StorageLocationModel';
import {MaterialDocumentModel} from './model/MaterialDocumentModel';

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

export const materialDocumentModelToMaterialDocument = (
  materialDocumentModel: MaterialDocumentModel,
): MaterialDocument => {
  const items: MaterialDocumentItem[] = materialDocumentModel.ITEMS.map(
    label => {
      return Object.freeze({
        count: label.COUNT,
        materialNumber: label.MATERIALNUMBER,
        batch: label.BATCH,
        quantity: label.QUANTITY,
        storageLocationIn: label.STORAGELOCATIONIN,
        storageLocationOut: label.STORAGELOCATIONOUT,
        movementType: label.MOVEMENTTYPE,
        productionOrder: label.PRODUCTIONORDER,
      });
    },
  );

  return Object.freeze({
    materialDocumentNumber: materialDocumentModel.MATERIALDOCUMENTNUMBER,
    items: items,
  });
};

export const labelToGoodsMovement = (
  goodsMovementCode: string,
  scannedLabels: Label[],
  storageLocationIn: string,
  storageLocationOut: string,
  movementType: string,
  productionOrder: string,
): GoodsMovement => {
  const items: GoodsMovementItem[] = scannedLabels.map(label => {
    return Object.freeze({
      count: label.count,
      materialNumber: label.materialNumber,
      batch: label.batch,
      quantity: label.quantity,
      storageLocationIn: storageLocationIn,
      storageLocationOut: storageLocationOut,
      movementType: movementType,
      productionOrder: productionOrder,
    });
  });

  return Object.freeze({
    goodsMovementCode: goodsMovementCode,
    items: items,
  });
};
