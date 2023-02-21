export interface StorageLocationModel {
  storageLocation: number;
  description: string;
}

export interface StorageLocationResponse {
  data: StorageLocationModel[];
}
