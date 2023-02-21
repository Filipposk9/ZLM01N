export interface Material {
  materialNumber: number;
  description: string;
  materialGroup: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  plant: number;
  storageLocation: StorageLocation;
}

export interface StorageLocation {
  storageLocation: number;
  description: string;
}
