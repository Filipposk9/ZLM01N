import base64 from 'react-native-base64';
import RequestGateway, {isError} from './RequestGateway';

interface TokenResponse {
  data: string;
}

interface SapRequestHeaders {
  'Content-type': string;
  'x-csrf-token': string;
  Authorization: string;
}

class SapRequestParameters {
  private username = 'FILKOZ';
  private password = 'COMPO2SITION4';

  private CSRF_REQUEST_HEADERS = {
    'x-csrf-token': 'Fetch',
    Authorization:
      'Basic ' + base64.encode(this.username + ':' + this.password),
  };

  private async getCSRFToken(): Promise<string | undefined> {
    const timeout = 5000;

    const response = await RequestGateway.get<TokenResponse>(
      '/mdata',
      this.CSRF_REQUEST_HEADERS,
      timeout,
    );

    if (isError(response)) {
      return undefined;
    } else {
      return response.result.data;
    }
  }

  async getSapRequestHeaders(): Promise<SapRequestHeaders | undefined> {
    let csrfToken = await this.getCSRFToken();

    if (csrfToken === undefined) {
      return undefined;
    } else {
      csrfToken = String(csrfToken);

      const headers = {
        'Content-type': 'application/json',
        'x-csrf-token': csrfToken,
        Authorization:
          'Basic ' + base64.encode(this.username + ':' + this.password),
      };

      return headers;
    }
  }
}

export default new SapRequestParameters();
