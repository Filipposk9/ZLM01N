import {MaterialModel} from './MaterialModel';

export interface OutboundDeliveryModel {
  header: OutboundDeliveryHeader;
  items: OutboundDeliveryItem[];
  handlingUnits: HandlingUnitModel;
}

//TODO: associated sales order?

interface OutboundDeliveryHeader {
  outboundDeliveryNumber: number;
  customerNumber: number;
  customerName: string;
  shipToPartyNumber: number;
  shipToPartyName: string;
  status: string;
}

interface OutboundDeliveryItem {
  positionNumber: number;
  material: MaterialModel;
}

interface HandlingUnitModel {
  handlingUnitNumber: number;
  sscc: string;
  packedMaterials: MaterialModel[];
}
