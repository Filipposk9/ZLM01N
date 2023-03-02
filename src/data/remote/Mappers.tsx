import {
  Material,
  StorageLocation,
  GoodsMovement,
  GoodsMovementItem,
  MaterialDocument,
  MaterialDocumentItem,
  Label,
  OutboundDelivery,
  OutboundDeliveryItem,
  PickingRequest,
  Picking,
  ProductionOrder,
  ProductionOrderComponent,
  ProductionOrderHeader,
} from '../../shared/Types';
import {MaterialModel} from './model/MaterialModel';
import {StorageLocationModel} from './model/StorageLocationModel';
import {MaterialDocumentModel} from './model/MaterialDocumentModel';
import {OutboundDeliveryModel} from './model/OutboundDeliveryModel';
import {PickingModel} from './model/PickingModel';
import {ProductionOrderModel} from './model/ProductionOrderModel';

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

export const outboundDeliveryModelToOutboundDelivery = (
  outboundDeliveryModel: OutboundDeliveryModel,
): OutboundDelivery => {
  const items: OutboundDeliveryItem[] = outboundDeliveryModel.ITEMS.map(
    item => {
      return Object.freeze({
        outboundDeliveryNumber: item.OUTBOUNDDELIVERYNUMBER,
        positionNumber: item.POSITIONNUMBER,
        materialNumber: item.MATERIALNUMBER,
        materialText: item.MATERIALTEXT,
        pickedQuantity: item.PICKEDQUANTITY,
        requirementQuantity: item.REQUIREMENTQUANTITY,
        unitOfMeasure: item.UNITOFMEASURE,
        handlingUnits: item.HANDLINGUNITS.map(handlingUnit => {
          return Object.freeze({
            sscc: handlingUnit.SSCC,
            handlingUnitNumber: handlingUnit.HANDLINGUNITNUMBER,
            batch: handlingUnit.BATCH,
            quantity: handlingUnit.QUANTITY,
            unitOfMeasure: handlingUnit.UNITOFMEASURE,
            storageLocation: handlingUnit.STORAGELOCATION,
          });
        }),
      });
    },
  );

  const header = Object.freeze({
    outboundDeliveryNumber: outboundDeliveryModel.HEADER.OUTBOUNDDELIVERYNUMBER,
    customerNumber: outboundDeliveryModel.HEADER.CUSTOMERNUMBER,
    customerName: outboundDeliveryModel.HEADER.CUSTOMERNAME,
    shipToPartyNumber: outboundDeliveryModel.HEADER.SHIPTOPARTYNUMBER,
    shipToPartyName: outboundDeliveryModel.HEADER.SHIPTOPARTYNAME,
    status: outboundDeliveryModel.HEADER.STATUS,
  });

  return Object.freeze({
    header: header,
    items: items,
  });
};

export const handlingUnitToPickingRequest = (
  outboundDeliveryNumber: string,
  sscc: string,
): PickingRequest => {
  return Object.freeze({
    outboundDeliveryNumber: outboundDeliveryNumber,
    sscc: sscc,
  });
};

export const pickingModelToPicking = (pickingModel: PickingModel): Picking => {
  return Object.freeze({
    code: pickingModel.CODE,
    message: pickingModel.MESSAGE,
    positionNumberHandled: pickingModel.POSITIONNUMBERHANDLED,
  });
};

export const productionOrderModelToProductionOrder = (
  productionOrderModel: ProductionOrderModel,
): ProductionOrder => {
  const components: ProductionOrderComponent[] =
    productionOrderModel.COMPONENTS.map(component => {
      return Object.freeze({
        reservationNumber: component.RESERVATIONNUMBER,
        reservationPosition: component.RESERVATIONPOSITION,
        materialNumber: component.MATERIALNUMBER,
        materialText: component.MATERIALTEXT,
        movementType: component.MOVEMENTTYPE,
        plant: component.PLANT,
        storageLocation: component.STORAGELOCATION,
        issuedQuantity: component.ISSUEDQUANTITY,
        requirementQuantity: component.REQUIREMENTQUANTITY,
        unitOfMeasure: component.UNITOFMEASURE,
        materialGroup: component.MATERIALGROUP,
      });
    });

  const header: ProductionOrderHeader = Object.freeze({
    productionOrderNumber: productionOrderModel.HEADER.PRODUCTIONORDERNUMBER,
    productionOrderMaterial:
      productionOrderModel.HEADER.PRODUCTIONORDERMATERIAL,
    productionOrderMaterialText:
      productionOrderModel.HEADER.PRODUCTIONORDERMATERIALTEXT,
    scheduledStartDate: productionOrderModel.HEADER.SCHEDULEDSTARTDATE,
    targetQuantity: productionOrderModel.HEADER.TARGETQUANTITY,
    confirmedYield: productionOrderModel.HEADER.CONFIRMEDYIELD,
    unitOfMeasure: productionOrderModel.HEADER.UNITOFMEASURE,
    associatedSalesOrder: productionOrderModel.HEADER.ASSOCIATEDSALESORDER,
    associatedSalesOrderItem:
      productionOrderModel.HEADER.ASSOCIATEDSALESORDERITEM,
    customerNumber: productionOrderModel.HEADER.CUSTOMERNUMBER,
    customerName: productionOrderModel.HEADER.CUSTOMERNAME,
    workCenterDescription: productionOrderModel.HEADER.WORKCENTERDESCRIPTION,
  });

  return Object.freeze({
    header: header,
    components: components,
  });
};
