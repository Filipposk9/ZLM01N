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
  HARDNESS: number;
  ANALYSIS: string;
  REDNESS: number;
  PH: number;
  SALT: number;
}

export interface TankCharacteristicsResponse {
  data: TankCharacteristicsModel;
}
