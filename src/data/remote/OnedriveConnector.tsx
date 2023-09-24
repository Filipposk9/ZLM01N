import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import AzureAuth from 'react-native-azure-auth';
import {uploadSmallFile} from '@harrisoff/onedrive-js-sdk';

class OnedriveConnector {
  private userID: string = '';
  private azureAuth: any;

  async initializeConnection(
    azureAuth: AzureAuth,
  ): Promise<string | undefined> {
    this.setAzureConfig(azureAuth);
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
    } catch (error) {
      console.log(error);
    }

    return accessToken;
  }

  private async prepareImageForUpload(
    path: string,
  ): Promise<Buffer | undefined> {
    const image = await RNFS.readFile(path, 'base64');

    const buffer = Buffer.from(image, 'base64');

    if (buffer) {
      return buffer;
    } else {
      return undefined;
    }
  }

  async uploadImage(localImagePath: string, remotePath: string) {
    const accessToken = this.getAccessToken().toString();

    if (accessToken !== undefined) {
      const image = this.prepareImageForUpload(localImagePath);

      const fileName = localImagePath.split('/');
      const fileNameWithExtension = fileName[fileName.length - 1];

      if (image !== undefined) {
        const onedriveResponse = await uploadSmallFile(
          image,
          remotePath + '/' + fileNameWithExtension,
          accessToken,
        );

        // TODO: if (onedriveResponse) check the response and return true or false or the response itself
      }
    }
  }
}

export default new OnedriveConnector();
