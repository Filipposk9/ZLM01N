import {GoodsMovement} from '../../../shared/Types';
import NetInfo from '@react-native-community/netinfo';
import {labelToGoodsMovement} from '../Mappers';
import SapRequestParameters from '../SapRequestParameters';
import RequestGateway, {isError} from '../RequestGateway';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';

class ApiPostBuffer {
  private isLocked: boolean = false;

  private goodsMovementQueue = [];

  constructor() {
    NetInfo.addEventListener(async state => {
      console.log(this.goodsMovementQueue, 'LOCALQUEUE');
      if (state.isConnected) {
        console.log(state.details?.strength, 'connection strength');
        if (state.details?.strength >= 30) {
          console.log('signal is good');
          if (!this.isLocked) {
            console.log('Queue is unlocked, LETS GO');
            if (this.goodsMovementQueue) {
              if (this.goodsMovementQueue.length > 0) {
                this.isLocked = true;
                await this.handleQueue();
                console.log('LOCKING QUEUE & handling queue');
              }
            }
          }
        }
      }
    });
  }

  setGoodsMovementQueue(newQueue) {
    this.goodsMovementQueue = this.goodsMovementQueue.concat(newQueue);
  }

  private async handleQueue() {
    const goodsMovementQueue = this.goodsMovementQueue;

    let newGoodsMovementQueue = [];

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const goodsMovementResponses = goodsMovementQueue.map(
      async goodsMovement => {
        const materialDocument: GoodsMovement = labelToGoodsMovement(
          goodsMovement.goodsMovementCode,
          goodsMovement.scannedLabels,
          goodsMovement.storageLocationIn,
          goodsMovement.storageLocationOut,
          goodsMovement.movementType,
          goodsMovement.productionOrder,
        );

        const response = await RequestGateway.post<MaterialDocumentResponse>(
          '/goodsmovement',
          sapRequestHeaders,
          materialDocument,
        );

        if (isError(response)) {
          newGoodsMovementQueue.push(goodsMovement);
        } else {
          return response;
        }
      },
    );

    if (goodsMovementResponses) {
      this.goodsMovementQueue = newGoodsMovementQueue;
      this.isLocked = false;
    }
  }
}

export default new ApiPostBuffer();
