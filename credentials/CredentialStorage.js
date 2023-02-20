import EncryptedStorage from 'react-native-encrypted-storage';

class CredentialStorage {
  static async setCredentials(username, password, csrfToken) {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        username: username,
        password: password,
        token: csrfToken,
      }),
    );
  }

  static async getCredentials() {
    return await EncryptedStorage.getItem('user_session');
  }
}

export default CredentialStorage;
