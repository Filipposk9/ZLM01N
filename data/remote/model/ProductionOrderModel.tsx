import {MaterialModel} from './MaterialModel';
import {SalesOrderModel} from './SalesOrderModel';

//TODO: rework model?

export interface ProductionOrderModel {
  header: ProductionOrderHeader;
  components: ProductionOrderComponent[];
}

interface ProductionOrderHeader {
  productionOrderNumber: string;
  producedMaterial: MaterialModel;
  scheduledStartDate: Date;
  targetQuantity: number; //REMOVE?
  confirmedYield: number;
  unitOfMeasure: number; //REMOVE?
  associatedSalesOrder: SalesOrderModel; //SD Model or primitive types?
  workCenter: string;
  workCenterDescription: string;
}

interface ProductionOrderComponent {
  reservationNumber: string;
  reservationPosition: number;
  material: MaterialModel;
  requirementQuantity: number;
  issuedQuantity: number;
}
