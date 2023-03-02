export interface ProductionOrderModel {
  HEADER: ProductionOrderHeader;
  COMPONENTS: ProductionOrderComponent[];
}

interface ProductionOrderHeader {
  PRODUCTIONORDERNUMBER: string;
  PRODUCTIONORDERMATERIAL: string;
  PRODUCTIONORDERMATERIALTEXT: string;
  SCHEDULEDSTARTDATE: Date;
  TARGETQUANTITY: number;
  CONFIRMEDYIELD: number;
  UNITOFMEASURE: number;
  ASSOCIATEDSALESORDER: string;
  ASSOCIATEDSALESORDERITEM: string;
  CUSTOMERNUMBER: string;
  CUSTOMERNAME: string;
  WORKCENTERDESCRIPTION: string;
}

interface ProductionOrderComponent {
  RESERVATIONNUMBER: string;
  RESERVATIONPOSITION: number;
  MATERIALNUMBER: string;
  MATERIALTEXT: string;
  MOVEMENTTYPE: string;
  PLANT: string;
  STORAGELOCATION: string;
  ISSUEDQUANTITY: number;
  REQUIREMENTQUANTITY: number;
  UNITOFMEASURE: string;
  MATERIALGROUP: string;
}

export interface ProductionOrderResponse {
  data: ProductionOrderModel;
}
