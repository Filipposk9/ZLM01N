import base64 from 'react-native-base64';
import RequestGateway, {isError} from './RequestGateway';

interface TokenResponse {
  data: string;
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
    const response = await RequestGateway.get<TokenResponse>(
      '/mdata',
      this.CSRF_REQUEST_HEADERS,
    );

    if (!isError(response)) {
      return response.result.data;
    }
  }

  public async getSapRequestHeaders() {
    const csrfToken = String(await this.getCSRFToken());

    const headers = {
      'Content-type': 'application/json',
      'x-csrf-token': csrfToken,
      Authorization:
        'Basic ' + base64.encode(this.username + ':' + this.password),
    };

    return headers;
  }
}

export default new SapRequestParameters();
