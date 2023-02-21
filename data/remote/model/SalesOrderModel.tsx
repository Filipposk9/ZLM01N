import {MaterialModel} from './MaterialModel';

export interface SalesOrderModel {
  header: SalesOrderHeader;
  items: SalesOrderItem[];
}

interface SalesOrderHeader {
  salesOrderNumber: number;
  customerNumber: number;
  customerName: string;
}

interface SalesOrderItem {
  positionNumber: number;
  material: MaterialModel;
}
