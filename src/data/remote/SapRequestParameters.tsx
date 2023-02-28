import base64 from 'react-native-base64';
import RequestGateway, {isError} from './RequestGateway';

class SapRequestParameters {
  private username = 'FILKOZ';
  private password = 'COMPO2SITION4';

  async getCSRFToken(): Promise<string | void | null> {
    const response = await RequestGateway.get<string>(
      '/mdata',
      this.CSRF_REQUEST_HEADERS,
    );

    if (!isError(response)) {
      return response.result.data;
    }
  }

  private CSRF_REQUEST_HEADERS = {
    'x-csrf-token': 'Fetch',
    Authorization:
      'Basic ' + base64.encode(this.username + ':' + this.password),
  };

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
