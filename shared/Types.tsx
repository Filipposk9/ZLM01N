export interface Material {
  materialNumber: string;
  description: string;
  materialGroup: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  plant: string;
  storageLocation: StorageLocation;
}

export interface StorageLocation {
  storageLocation: string;
  description: string;
}
