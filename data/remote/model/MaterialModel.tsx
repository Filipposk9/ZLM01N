import {StorageLocationModel} from './StorageLocationModel';

export interface MaterialModel {
  materialNumber: string;
  description: string;
  materialGroup: string;
  batch: string;
  quantity: number;
  unitOfMeasure: string;
  plant: string;
  storageLocation: string;
}

export interface MaterialResponse {
  data: MaterialModel[];
}
