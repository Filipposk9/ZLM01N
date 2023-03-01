import {
  Label,
  MaterialDocument,
  GoodsMovement,
  PickingRequest,
  Picking,
} from '../../../shared/Types';
import {
  handlingUnitToPickingRequest,
  labelToGoodsMovement,
  materialDocumentModelToMaterialDocument,
  pickingModelToPicking,
} from '../Mappers';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import {PickingResponse} from '../model/PickingModel';
import RequestGateway, {isError} from '../RequestGateway';
import SapRequestParameters from '../SapRequestParameters';

class ApiPostService {
  async createGoodsMovement(
    goodsMovementCode: string,
    scannedLabels: Label[],
    storageLocationIn: string,
    storageLocationOut: string,
    movementType: string,
    productionOrder: string,
  ): Promise<MaterialDocument | undefined> {
    const materialDocument: GoodsMovement = labelToGoodsMovement(
      goodsMovementCode,
      scannedLabels,
      storageLocationIn,
      storageLocationOut,
      movementType,
      productionOrder,
    );

    //TODO: /transfer_posting to /goods_movement

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.post<MaterialDocumentResponse>(
      '/transfer_posting',
      sapRequestHeaders,
      materialDocument,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return materialDocumentModelToMaterialDocument(response.result.data);
    }
  }

  async createPickingRequest(
    outboundDeliveryNumber: string,
    sscc: string,
  ): Promise<Picking | undefined> {
    const pickingRequest: PickingRequest = handlingUnitToPickingRequest(
      outboundDeliveryNumber,
      sscc,
    );

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const response = await RequestGateway.post<PickingResponse>(
      '/picking',
      sapRequestHeaders,
      pickingRequest,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return pickingModelToPicking(response.result.data);
    }
  }
}

export default new ApiPostService();
