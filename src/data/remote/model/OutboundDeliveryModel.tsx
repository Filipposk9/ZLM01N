import {MaterialModel} from './MaterialModel';

export interface OutboundDeliveryModel {
  header: OutboundDeliveryHeader;
  items: OutboundDeliveryItem[];
  handlingUnits: HandlingUnitModel;
}

//TODO: associated sales order?

interface OutboundDeliveryHeader {
  outboundDeliveryNumber: string;
  customerNumber: string;
  customerName: string;
  shipToPartyNumber: string;
  shipToPartyName: string;
  status: string;
}

interface OutboundDeliveryItem {
  positionNumber: number;
  material: MaterialModel;
}

interface HandlingUnitModel {
  handlingUnitNumber: string;
  sscc: string;
  packedMaterials: MaterialModel[];
}
