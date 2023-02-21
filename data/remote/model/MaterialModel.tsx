import {StorageLocationModel} from './StorageLocationModel';

export interface MaterialModel {
  materialNumber: number;
  description: string;
  materialGroup: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  plant: number;
  storageLocation: StorageLocationModel;
}

export interface MaterialResponse {
  data: MaterialModel[];
}
