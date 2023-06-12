export interface TankCharacteristicsModel {
  TANK: string;
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
}

export interface TankCharacteristicsResponse {
  data: TankCharacteristicsModel;
}
