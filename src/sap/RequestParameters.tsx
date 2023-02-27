import CredentialStorage from '../credentials/CredentialStorage';
import base64 from 'react-native-base64';

const credentials = JSON.parse(await CredentialStorage.getCredentials());

//TODO: interfaces

export const headers = {
  'Content-type': 'application/json',
  'x-csrf-token': credentials.token,
  Authorization:
    'Basic ' + base64.encode(credentials.username + ':' + credentials.password),
};
