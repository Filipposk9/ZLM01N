import {Label, MaterialDocument} from '../../../shared/Types';
import {
  labelToGoodsMovement,
  materialDocumentModelToMaterialDocument,
} from '../Mappers';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import RequestGateway, {isError} from '../RequestGateway';

class ApiPostService {
  async createGoodsMovement(
    goodsMovementCode: string,
    scannedLabels: Label[],
    storageLocationIn: string,
    storageLocationOut: string,
    movementType: string,
    productionOrder: string,
  ): Promise<MaterialDocument | undefined> {
    //TODO: rework input parameters into one structure GoodsMovement

    const materialDocument = labelToGoodsMovement(
      goodsMovementCode,
      scannedLabels,
      storageLocationIn,
      storageLocationOut,
      movementType,
      productionOrder,
    );

    //TODO: /transfer_posting to /goods_movement

    const response = await RequestGateway.post<MaterialDocumentResponse>(
      '/transfer_posting',
      materialDocument,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return materialDocumentModelToMaterialDocument(response.result.data);
    }
  }
}

export default new ApiPostService();
