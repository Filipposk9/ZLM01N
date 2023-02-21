export interface StorageLocationModel {
  storageLocation: string;
  description: string;
}

export interface StorageLocationResponse {
  data: StorageLocationModel[];
}
