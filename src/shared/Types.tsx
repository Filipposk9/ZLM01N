export interface User {
  username: string;
  password: string;
}

export interface Material {
  materialNumber: string;
  description: string;
  materialGroup: string;
  unitOfMeasure: string;
}

export interface StorageLocation {
  storageLocation: string;
  description: string;
}

export interface GoodsMovement {
  goodsMovementCode: string;
  items: GoodsMovementItem[];
}

export interface GoodsMovementItem {
  count: number;
  materialNumber: string;
  batch: string;
  quantity: number;
  storageLocationIn: string;
  storageLocationOut: string;
  movementType: string;
  productionOrder: string;
}

export interface Label {
  count: number;
  materialNumber: string;
  batch: string;
  quantity: number;
}

//TODO: add date and time and unit of measure in materialdocumentresponse

export interface MaterialDocument {
  materialDocumentNumber: string;
  items: MaterialDocumentItem[];
}

export interface MaterialDocumentItem {
  count: number;
  materialNumber: string;
  batch: string;
  quantity: number;
  storageLocationIn: string;
  storageLocationOut: string;
  movementType: string;
  productionOrder: string;
}

export interface GoodsMovementQueue {
  goodsMovementCode: string;
  scannedLabels: Label[];
  storageLocationIn: string;
  storageLocationOut: string;
  movementType: string;
  productionOrder: string;
}

export interface OutboundDelivery {
  header: OutboundDeliveryHeader;
  items: OutboundDeliveryItem[];
}

export interface OutboundDeliveryHeader {
  outboundDeliveryNumber: string;
  customerNumber: string;
  customerName: string;
  shipToPartyNumber: string;
  shipToPartyName: string;
  status: string;
}

export interface OutboundDeliveryItem {
  outboundDeliveryNumber: string;
  positionNumber: number;
  materialNumber: string;
  materialText: string;
  pickedQuantity: number;
  requirementQuantity: number;
  unitOfMeasure: string;
  handlingUnits: HandlingUnit[];
}

export interface HandlingUnit {
  sscc: string;
  handlingUnitNumber: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  storageLocation: string;
}

export interface PickingRequest {
  outboundDeliveryNumber: string;
  sscc: string;
}

export interface Picking {
  code: number;
  message: string;
  positionNumberHandled: number;
}

export interface ProductionOrder {
  header: ProductionOrderHeader;
  components: ProductionOrderComponent[];
}

export interface ProductionOrderHeader {
  productionOrderNumber: string;
  productionOrderMaterial: string;
  productionOrderMaterialText: string;
  scheduledStartDate: Date;
  targetQuantity: number;
  confirmedYield: number;
  unitOfMeasure: string;
  associatedSalesOrder: string;
  associatedSalesOrderItem: string;
  customerNumber: string;
  customerName: string;
  workCenterDescription: string;
}

export interface ProductionOrderComponent {
  reservationNumber: string;
  reservationPosition: number;
  materialNumber: string;
  materialText: string;
  movementType: string;
  plant: string;
  storageLocation: string;
  issuedQuantity: number;
  requirementQuantity: number;
  unitOfMeasure: string;
  materialGroup: string;
}
