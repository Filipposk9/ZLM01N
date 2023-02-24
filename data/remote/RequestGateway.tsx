import CredentialStorage from '../../credentials/CredentialStorage';
import base64 from 'react-native-base64';
import {
  ErrorResponse,
  SuccessResponse,
  REQUEST_LIMIT_PER_SEC,
} from './NetworkTypes';

// TODO:  Delay between requests is not working 100% correct.
class RequestGateway {
  private baseUrl: string;
  private requestTimeQueue: number[] = [];

  constructor(
    baseUrl: string = 'http://10.0.0.17:8101/sap/bc/gui/sap/its/zwm_rfn',
  ) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<SuccessResponse<T> | ErrorResponse> {
    const credentials = JSON.parse(await CredentialStorage.getCredentials());

    try {
      await this.processRequest();
      console.log('Network request to', endpoint);
      const response = await fetch(this.baseUrl + endpoint, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'x-csrf-token': credentials.token,
          Authorization:
            'Basic ' +
            base64.encode(credentials.username + ':' + credentials.password),
        },
      });

      const result = await response.json();

      if (result.type && result.message) {
        const error = {
          status: result.status,
          errorName: result.type,
          errorMessage: result.message,
        };
        console.log(
          `RequestGateway::get Response Error: ${error.status}-${error.errorName} message: ${error.errorMessage}`,
        );
        return error;
      } else {
        const response = {data: result};
        return {
          result: response as T,
        };
      }
    } catch (error) {
      const _e = error as Error;
      console.log(
        `RequestGateway::get Error: ${_e.name} message: ${_e.message}`,
      );
      return {
        errorName: _e.name,
        errorMessage: _e.message,
      };
    }
  }

  private async processRequest() {
    return new Promise(async resolve => {
      const len = this.requestTimeQueue.push(getSec());
      await this.checkSecLimit(len - 1);
      this.requestTimeQueue[len - 1] = getSec();
      resolve(null);
    });
  }

  private async checkSecLimit(index: number) {
    const len = this.requestTimeQueue.length;
    const prevElement =
      len > REQUEST_LIMIT_PER_SEC
        ? this.requestTimeQueue[index - REQUEST_LIMIT_PER_SEC]
        : undefined;
    if (prevElement === getSec()) {
      await this.delay(index * 1000);
      this.requestTimeQueue[index] = getSec();
      await this.checkSecLimit(index);
    }
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(null), ms));
  }
}

export function isError(a: any): a is ErrorResponse {
  return (a as ErrorResponse).errorMessage !== undefined;
}

const getSec = () => {
  return Math.ceil(Date.now() / 1000);
};

export default new RequestGateway();
