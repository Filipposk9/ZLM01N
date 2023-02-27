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

  //TODO: async get<T>(endpoint: string, params: {}): Promise<...
  async get<T>(endpoint: string): Promise<SuccessResponse<T> | ErrorResponse> {
    const credentials = JSON.parse(
      String(await CredentialStorage.getCredentials()),
    );

    try {
      //await this.processRequest();
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

  //TODO: body datatype
  async post<T>(
    endpoint: string,
    data: any,
  ): Promise<SuccessResponse<T> | ErrorResponse> {
    const credentials = JSON.parse(
      String(await CredentialStorage.getCredentials()),
    );

    const csrfToken = String(await this.getCSRFToken());

    try {
      console.log('Network request to', endpoint);
      const response = await fetch(this.baseUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-csrf-token': csrfToken,
          Authorization:
            'Basic ' +
            base64.encode(credentials.username + ':' + credentials.password),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.type && result.message) {
        const error = {
          status: result.status,
          errorName: result.type,
          errorMessage: result.message,
        };
        console.log(
          `RequestGateway::post Response Error: ${error.status}-${error.errorName} message: ${error.errorMessage}`,
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
        `RequestGateway::post Error: ${_e.name} message: ${_e.message}`,
      );
      return {
        errorName: _e.name,
        errorMessage: _e.message,
      };
    }
  }

  private async getCSRFToken(): Promise<string | void | null> {
    //TODO: USE this.get(), credentials from credential storage

    return await fetch(this.baseUrl + '/mdata', {
      method: 'GET',
      headers: {
        'x-csrf-token': 'Fetch',
        Authorization:
          'Basic ' + base64.encode('FILKOZ' + ':' + 'COMPO2SITION4'),
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.headers.get('x-csrf-token');
        } else if (response.status === 401) {
          throw new Error('Λάθος όνομα χρήστη/κωδικός πρόσβασης');
        } else if (response.status === 500) {
          throw new Error('SAP Server is down');
        } else {
          throw new Error('Unhandled HTTP response');
        }
      })
      .catch(error => {
        //console.log(error);
      });
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
