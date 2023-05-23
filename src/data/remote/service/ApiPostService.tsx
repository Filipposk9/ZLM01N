import ApiPostBuffer from './ApiPostBuffer';
import {
  Label,
  MaterialDocument,
  GoodsMovement,
  PickingRequest,
  Picking,
  iTankCharacteristics,
} from '../../../shared/Types';
import {
  handlingUnitToPickingRequest,
  labelToGoodsMovement,
  materialDocumentModelToMaterialDocument,
  pickingModelToPicking,
  tankCharacteristicsModelToTankCharacteristics,
} from '../Mappers';
import {MaterialDocumentResponse} from '../model/MaterialDocumentModel';
import {PickingResponse} from '../model/PickingModel';
import RequestGateway, {isError} from '../RequestGateway';
import SapRequestParameters from '../SapRequestParameters';
import NetInfo, {NetInfoWifiState} from '@react-native-community/netinfo';
import {TankCharacteristicsResponse} from '../model/TankCharacteristicsModel';

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

    const connectionStrength: number | null =
      await this.getConnectionStrength();

    if (connectionStrength && connectionStrength > 0) {
      const sapRequestHeaders =
        await SapRequestParameters.getSapRequestHeaders();

      const response = await RequestGateway.post<MaterialDocumentResponse>(
        '/goodsmovement',
        materialDocument,
        sapRequestHeaders,
      );

      if (isError(response)) {
        ApiPostBuffer.setGoodsMovementQueue(materialDocument);

        return undefined;
      } else {
        return materialDocumentModelToMaterialDocument(response.result.data);
      }
    } else {
      ApiPostBuffer.setGoodsMovementQueue(materialDocument);

      return undefined;
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
      pickingRequest,
      sapRequestHeaders,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return pickingModelToPicking(response.result.data);
    }
  }

  async changeBatchCharacteristics(
    tankCharacteristics: iTankCharacteristics,
  ): Promise<iTankCharacteristics | undefined> {
    const connectionStrength: number | null =
      await this.getConnectionStrength();

    if (connectionStrength && connectionStrength > 0) {
      const sapRequestHeaders =
        await SapRequestParameters.getSapRequestHeaders();

      const response = await RequestGateway.post<TankCharacteristicsResponse>(
        '/batchclass',
        tankCharacteristics,
        sapRequestHeaders,
      );

      if (isError(response)) {
        ApiPostBuffer.setTankCharacteristicsQueue(tankCharacteristics);
        return undefined;
      } else {
        return tankCharacteristicsModelToTankCharacteristics(
          response.result.data,
        );
      }
    } else {
      ApiPostBuffer.setTankCharacteristicsQueue(tankCharacteristics);

      return undefined;
    }
  }

  private async getConnectionStrength(): Promise<number | null> {
    const connectionState = await NetInfo.fetch().then(async state => {
      return state;
    });

    if (connectionState.isConnected) {
      const {strength} = connectionState.details as NetInfoWifiState['details'];

      if (strength !== null) {
        return strength;
      }
    }

    return 0;
  }
}

export default new ApiPostService();
