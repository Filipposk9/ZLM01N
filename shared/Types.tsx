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

export interface MaterialDocument {
  goodsMovementCode: string;
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

export interface Label {
  count: number;
  materialNumber: string;
  batch: string;
  quantity: number;
}
