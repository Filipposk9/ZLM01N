export interface OutboundDeliveryModel {
  HEADER: OutboundDeliveryHeader;
  ITEMS: OutboundDeliveryItem[];
}

interface OutboundDeliveryHeader {
  OUTBOUNDDELIVERYNUMBER: string;
  ASSOCIATEDSALESORDER: string;
  CUSTOMERNUMBER: string;
  CUSTOMERNAME: string;
  SHIPTOPARTYNUMBER: string;
  SHIPTOPARTYNAME: string;
  STATUS: string;
}

interface OutboundDeliveryItem {
  OUTBOUNDDELIVERYNUMBER: string;
  POSITIONNUMBER: number;
  MATERIALNUMBER: string;
  MATERIALTEXT: string;
  PICKEDQUANTITY: number;
  REQUIREMENTQUANTITY: number;
  UNITOFMEASURE: string;
  HANDLINGUNITS: HandlingUnit[];
}

interface HandlingUnit {
  SSCC: string;
  HANDLINGUNITNUMBER: string;
  BATCH: string;
  QUANTITY: number;
  UNITOFMEASURE: string;
  STORAGELOCATION: string;
}

export interface OutboundDeliveryResponse {
  data: OutboundDeliveryModel;
}
