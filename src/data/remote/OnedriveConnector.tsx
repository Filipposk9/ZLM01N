import AzureAuth from 'react-native-azure-auth';
import {uploadSmallFile} from '@harrisoff/onedrive-js-sdk';
import {Buffer} from '@craftzdog/react-native-buffer';

class OnedriveConnector {
  private userID: string = '';
  private azureAuth: any;

  async initializeConnection(
    azureAuth: AzureAuth,
  ): Promise<string | undefined> {
    if (this.azureAuth === undefined) {
      this.setAzureConfig(azureAuth);
    }

    const accessToken = await this.getAccessToken();

    //TODO: return connection info
    if (accessToken) {
      return accessToken;
    }
  }

  private setAzureConfig(azureAuth: AzureAuth) {
    this.azureAuth = azureAuth;
  }

  private async getAccessToken(): Promise<string | undefined> {
    let accessToken;

    try {
      // Try to get cached accessToken or refresh an expired one
      if (this.userID && this.userID !== '') {
        const cachedTokens = await this.azureAuth.auth.acquireTokenSilent({
          scope: 'openid profile User.ReadWrite Files.ReadWrite.All',
          userId: this.userID,
        });

        if (cachedTokens) {
          accessToken = cachedTokens.accessToken;
        }
      } else {
        // No cached tokens or the requested scope defines new not yet consented permissions
        // Open a window for user interaction
        const newTokens = await this.azureAuth.webAuth.authorize({
          scope: 'openid profile User.ReadWrite Files.ReadWrite.All',
        });

        if (newTokens !== undefined) {
          this.userID = newTokens.userId;

          accessToken = newTokens.accessToken;
        }
      }
    } catch (error) {}

    return accessToken;
  }

  async uploadImage(
    image: Buffer,
    remotePath: string,
  ): Promise<boolean | undefined> {
    const accessToken = await this.getAccessToken();

    if (accessToken && image) {
      const onedriveResponse = await uploadSmallFile(
        image,
        remotePath,
        accessToken,
      );

      if (onedriveResponse) {
        if (onedriveResponse.id !== '') {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
  }
}

export default new OnedriveConnector();
