export interface User {
  username: string;
  password: string;
  buildingCode: string;
  firstName: string;
  lastName: string;
}

export interface Material {
  materialNumber: string;
  description: string;
  materialGroup: string;
  unitOfMeasure: string;
}

export interface Batch {
  materialNumber: string;
  batch: string;
  quantity: number;
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
  validity: boolean;
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
  iserror: boolean;
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
  associatedSalesOrder: string;
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
  status: string;
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

export interface BatchCharacteristics {
  materialNumber: string;
  materialText: string;
  batch: string;
  quantity: number;
  storageLocation: string;
  materialGroup: string;
  externalMaterialGroup: string;
  lab: string;
  color: string;
  quality: string;
  crop: string;
  unitsPerKg: string;
  oliveFly: string;
  gliospore: string;
  colorQuality: string;
  hardness: string;
  analysis: string;
  redness: string;
  pH: string;
  salt: string;
  acidity: string;
  defects: string;
}

export interface iTankCharacteristics extends BatchCharacteristics {
  tank: string;
}

export interface Tank {
  tank: string;
}

export interface Location {
  user: string;
  timestamp: number | null;
  accuracy: number | null;
  altitude: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
}

export interface TankMovement {
  tank: string;
  labels: Label[];
}
