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

//TODO: add date and time and unit of measure in materialdocumentresponse
