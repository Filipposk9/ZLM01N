export interface MaterialDocumentModel {
  MATERIALDOCUMENTNUMBER: string;
  ITEMS: MaterialDocumentItem[];
}

export interface MaterialDocumentResponse {
  data: MaterialDocumentModel;
}

interface MaterialDocumentItem {
  COUNT: number;
  MATERIALNUMBER: string;
  BATCH: string;
  QUANTITY: number;
  UNITOFMEASURE: string;
  STORAGELOCATIONIN: string;
  STORAGELOCATIONOUT: string;
  MOVEMENTTYPE: string;
  PRODUCTIONORDER: string;
  ISERROR: boolean;
}
