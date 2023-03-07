export interface BatchModel {
  MATERIALNUMBER: string;
  BATCH: string;
  QUANTITY: number;
}

export interface BatchResponse {
  data: BatchModel;
}
