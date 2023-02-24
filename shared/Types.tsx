export interface User {
  username: string;
  password: string;
}

export interface Material {
  materialNumber: string;
  description: string;
  materialGroup: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  plant: string;
  storageLocation: string;
}

export interface StorageLocation {
  storageLocation: string;
  description: string;
}
