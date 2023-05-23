import {GoodsMovement, iTankCharacteristics} from '../../../shared/Types';
import NetInfo, {NetInfoWifiState} from '@react-native-community/netinfo';
import SapRequestParameters from '../SapRequestParameters';
import RequestGateway, {isError} from '../RequestGateway';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import {
  materialDocumentModelToMaterialDocument,
  tankCharacteristicsModelToTankCharacteristics,
} from '../Mappers';
import {TankCharacteristicsResponse} from '../model/TankCharacteristicsModel';
//TODO: variable multi-queue using generics
class ApiPostBuffer {
  private goodsMovementQueueIsLocked: boolean = false;
  private tankCharacteristicsQueueIsLocked: boolean = false;

  private goodsMovementQueue: GoodsMovement[] = [];
  private tankCharacteristicsQueue: iTankCharacteristics[] = [];

  readonly unlockThreshold: number = 10;

  constructor() {
    NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const {strength} = state.details as NetInfoWifiState['details'];

        if (strength) {
          if (strength >= this.unlockThreshold) {
            if (!this.goodsMovementQueueIsLocked) {
              if (
                this.goodsMovementQueue &&
                this.goodsMovementQueue.length > 0
              ) {
                this.goodsMovementQueueIsLocked = true;
                await this.handleGoodsMovementQueue();
              }
            }

            if (!this.tankCharacteristicsQueueIsLocked) {
              if (
                this.tankCharacteristicsQueue &&
                this.tankCharacteristicsQueue.length > 0
              ) {
                this.tankCharacteristicsQueueIsLocked = true;
                await this.handleTankCharacteristicsQueue();
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

  setTankCharacteristicsQueue(newQueue: iTankCharacteristics) {
    this.tankCharacteristicsQueue =
      this.tankCharacteristicsQueue.concat(newQueue);
  }

  private async handleGoodsMovementQueue() {
    const goodsMovementQueue = this.goodsMovementQueue;

    let newGoodsMovementQueue: GoodsMovement[] = [];

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const goodsMovementResponses = goodsMovementQueue.map(
      async goodsMovement => {
        const response = await RequestGateway.post<MaterialDocumentResponse>(
          '/goodsmovement',
          goodsMovement,
          sapRequestHeaders,
        );

        if (isError(response)) {
          newGoodsMovementQueue.push(goodsMovement);
        } else {
          return materialDocumentModelToMaterialDocument(response.result.data);
        }
      },
    );

    if (goodsMovementResponses) {
      this.goodsMovementQueue = newGoodsMovementQueue;
      this.goodsMovementQueueIsLocked = false;
    }
  }

  private async handleTankCharacteristicsQueue() {
    const tankCharacteristicsQueue = this.tankCharacteristicsQueue;

    let newTankCharacteristicsQueue: iTankCharacteristics[] = [];

    const sapRequestHeaders = await SapRequestParameters.getSapRequestHeaders();

    const tankCharacteristicsResponses = tankCharacteristicsQueue.map(
      async tankCharacteristics => {
        const response = await RequestGateway.post<TankCharacteristicsResponse>(
          '/batchclass',
          tankCharacteristics,
          sapRequestHeaders,
        );

        if (isError(response)) {
          newTankCharacteristicsQueue.push(tankCharacteristics);
        } else {
          return tankCharacteristicsModelToTankCharacteristics(
            response.result.data,
          );
        }
      },
    );

    if (tankCharacteristicsResponses) {
      this.tankCharacteristicsQueue = newTankCharacteristicsQueue;
      this.goodsMovementQueueIsLocked = false;
    }
  }
}

export default new ApiPostBuffer();
