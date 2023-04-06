// import CookieManager from '@react-native-cookies/cookies';
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
  private username: string = '';
  private password: string = '';

  private CSRF_REQUEST_HEADERS = {
    'x-csrf-token': 'Fetch',
    Authorization:
      'Basic ' + base64.encode(this.username + ':' + this.password),
  };

  async setSapCredentials(
    username: string,
    password: string,
  ): Promise<boolean | undefined> {
    // CookieManager.clearAll();
    this.username = username;
    this.password = password;

    this.CSRF_REQUEST_HEADERS = {
      'x-csrf-token': 'Fetch',
      Authorization:
        'Basic ' + base64.encode(this.username + ':' + this.password),
    };

    const csrfToken = await this.getCSRFToken();

    if (csrfToken !== undefined) {
      return true;
    } else {
      return undefined;
    }
  }

  private async getCSRFToken(timeout: number = 0): Promise<string | undefined> {
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

  async getSapRequestHeaders(
    timeout: number = 0,
  ): Promise<SapRequestHeaders | undefined> {
    let csrfToken = await this.getCSRFToken(timeout);

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
