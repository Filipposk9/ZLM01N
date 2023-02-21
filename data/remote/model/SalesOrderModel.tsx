import {MaterialModel} from './MaterialModel';

export interface SalesOrderModel {
  header: SalesOrderHeader;
  items: SalesOrderItem[];
}

interface SalesOrderHeader {
  salesOrderNumber: string;
  customerNumber: string;
  customerName: string;
}

interface SalesOrderItem {
  positionNumber: number;
  material: MaterialModel;
}
