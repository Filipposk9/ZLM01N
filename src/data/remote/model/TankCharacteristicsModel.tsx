import {BatchCharacteristicsModel} from './BatchCharacteristicsModel';

export interface TankCharacteristicsModel extends BatchCharacteristicsModel {
  TANK: string;
}

export interface TankCharacteristicsResponse {
  data: TankCharacteristicsModel;
}
