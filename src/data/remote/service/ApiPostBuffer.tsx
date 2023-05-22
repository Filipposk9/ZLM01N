import {GoodsMovement, Location, User} from '../../../shared/Types';
import NetInfo, {NetInfoWifiState} from '@react-native-community/netinfo';
import SapRequestParameters from '../SapRequestParameters';
import RequestGateway, {isError} from '../RequestGateway';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import {
  geolocationResponseToLocation,
  materialDocumentModelToMaterialDocument,
} from '../Mappers';
import {LocationResponse} from '../model/LocationModel';
import {GeolocationResponse} from '@react-native-community/geolocation';
import RemoteDBService from '../../../services/RemoteDBService';
//TODO: variable multi-queue using generics
class ApiPostBuffer {
  private goodsMovementQueueIsLocked: boolean = false;
  private locationQueueIsLocked: boolean = false;

  private goodsMovementQueue: GoodsMovement[] = [];
  private locationQueue: GeolocationResponse[] = [];
  readonly unlockThreshold: number = 10;
  private currentUser: User = {
    buildingCode: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

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

            if (!this.locationQueueIsLocked) {
              if (this.locationQueue && this.locationQueue.length > 0) {
                this.locationQueueIsLocked = true;
                await this.handleLocationQueue();
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

  async setLocationQueue(newQueue: GeolocationResponse, currentUser: User) {
    this.currentUser = currentUser;
    this.locationQueue = this.locationQueue.concat(newQueue);
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

  private async handleLocationQueue() {
    const locationQueue = this.locationQueue;

    let newLocationQueue: GeolocationResponse[] = [];

    const locationResponses = locationQueue.map(async location => {
      const locationStamp = geolocationResponseToLocation(
        location,
        this.currentUser,
      );

      const headers = {
        'Content-type': 'application/json',
      };

      const response = await RemoteDBService.post<LocationResponse>(
        '/location',
        locationStamp,
        headers,
      );

      if (isError(response)) {
        newLocationQueue.push(location);
      }
    });

    if (locationResponses) {
      this.locationQueue = newLocationQueue;
      this.locationQueueIsLocked = false;
    }
  }
}

export default new ApiPostBuffer();
