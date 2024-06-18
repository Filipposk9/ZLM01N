export interface BatchCharacteristicsModel {
  MATERIALNUMBER: string;
  MATERIALTEXT: string;
  BATCH: string;
  QUANTITY: number;
  STORAGELOCATION: string;
  MATERIALGROUP: string;
  EXTERNALMATERIALGROUP: string;
  LAB: string;
  COLOR: string;
  QUALITY: string;
  CROP: string;
  UNITSPERKG: string;
  OLIVEFLY: string;
  GLIOSPORE: string;
  COLORQUALITY: string;
  HARDNESS: string;
  ANALYSIS: string;
  REDNESS: string;
  PH: string;
  SALT: string;
  ACIDITY: string;
  DEFECTS: string;
}

export interface BatchCharacteristicsResponse {
  data: BatchCharacteristicsModel;
}
