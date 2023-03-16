import {GoodsMovement} from '../../../shared/Types';
import NetInfo, {NetInfoWifiState} from '@react-native-community/netinfo';
import SapRequestParameters from '../SapRequestParameters';
import RequestGateway, {isError} from '../RequestGateway';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';

class ApiPostBuffer {
  private isLocked: boolean = false;

  private goodsMovementQueue: GoodsMovement[] = [];

  //TODO: type safety

  constructor() {
    NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const {strength} = state.details as NetInfoWifiState['details'];

        if (strength) {
          if (strength >= 30) {
            if (!this.isLocked) {
              if (this.goodsMovementQueue) {
                if (this.goodsMovementQueue.length > 0) {
                  this.isLocked = true;
                  await this.handleQueue();
                }
              }
            }
          }
        }
      }
    });
  }

  setGoodsMovementQueue(newQueue: GoodsMovement) {
    this.goodsMovementQueue = this.goodsMovementQueue.concat(newQueue);
  }

  private async handleQueue() {
    const goodsMovementQueue = this.goodsMovementQueue;

    let newGoodsMovementQueue: GoodsMovement[] = [];

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const goodsMovementResponses = goodsMovementQueue.map(
      async goodsMovement => {
        const response = await RequestGateway.post<MaterialDocumentResponse>(
          '/goodsmovement',
          sapRequestHeaders,
          goodsMovement,
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
