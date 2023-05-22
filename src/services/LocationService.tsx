import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import ApiPostBuffer from '../data/remote/service/ApiPostBuffer';
import {User} from '../shared/Types';

class LocationService {
  private currentLongitude: string = '';
  private currentLatitude: string = '';
  private locationStatus: string = '';
  private currentUser: User = {
    buildingCode: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  start(user: User): void {
    this.currentUser = user;
    this.requestLocationPermission();
  }

  private async requestLocationPermission(): Promise<boolean> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonPositive: 'Consent',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.subscribeLocationLocation();

        return true;
      } else {
        this.locationStatus = 'Permission Denied';
      }
    } catch (err) {
      console.warn(err);
    }

    return false;
  }

  private subscribeLocationLocation = (): void => {
    const watchID = Geolocation.watchPosition(
      position => {
        this.locationStatus = 'You are Here';

        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        this.currentLongitude = currentLongitude;
        this.currentLatitude = currentLatitude;

        ApiPostBuffer.setLocationQueue(position, this.currentUser);
      },
      error => {
        this.locationStatus = error.message;
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        maximumAge: 1000,
      },
    );
  };
}

export default new LocationService();
