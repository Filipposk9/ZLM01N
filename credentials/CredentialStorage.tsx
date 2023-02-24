import EncryptedStorage from 'react-native-encrypted-storage';

class CredentialStorage {
  static async setCredentials(
    username: string,
    password: string,
    csrfToken: string,
  ) {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        username: username,
        password: password,
        token: csrfToken,
      }),
    );
  }

  static async getCredentials(): Promise<string | null> {
    return await EncryptedStorage.getItem('user_session');
  }
}

export default CredentialStorage;
