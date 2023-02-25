import UserDao from './local/dao/UserDao';
import MasterDataService from './remote/service/MasterDataService';
import StorageLocationDao from './local/dao/StorageLocationDao';
import {User, StorageLocation} from '../shared/Types';

import Transporter from './transporter/Transporter';

class Repository {
  async getUsers(): Promise<User[] | undefined> {
    const localUsers = await UserDao.getUsers();

    if (localUsers && localUsers.length > 0) {
      return localUsers;
    }

    return undefined;
  }

  async getUser(username: string): Promise<User | undefined> {
    const localUser = await UserDao.getUser(username);

    if (localUser) {
      return localUser;
    }

    return undefined;
  }

  async getStorageLocations(): Promise<StorageLocation[]> {
    const remoteStorageLocationList =
      await MasterDataService.getStorageLocations();

    if (remoteStorageLocationList && remoteStorageLocationList.length > 0) {
      Transporter.transport(remoteStorageLocationList);

      return remoteStorageLocationList;
    } else {
      const localStorageLocationList =
        await StorageLocationDao.getStorageLocations();

      return localStorageLocationList;
    }
  }
}

export default new Repository();
