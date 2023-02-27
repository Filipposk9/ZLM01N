import {Label, MaterialDocument, GoodsMovement} from '../../../shared/Types';
import {
  labelToGoodsMovement,
  materialDocumentModelToMaterialDocument,
} from '../Mappers';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import RequestGateway, {isError} from '../RequestGateway';
import NetInfo from '@react-native-community/netinfo';
import {setGoodsMovementQueue} from '../../../redux/actions/GoodsMovementQueueActions';

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

    const connectionState = await NetInfo.fetch().then(async state => {
      return state;
    });

    if (connectionState.details.strength >= 50) {
      const response = await RequestGateway.post<MaterialDocumentResponse>(
        '/transfer_posting',
        materialDocument,
      );

      if (isError(response)) {
        return undefined;
      } else {
        return materialDocumentModelToMaterialDocument(response.result.data);
      }
    } else {
      //TODO: send to redux
    }
  }
}

export default new ApiPostService();
