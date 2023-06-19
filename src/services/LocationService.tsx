import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import {geolocationResponseToLocation} from '../data/remote/Mappers';
import {LocationResponse} from '../data/remote/model/LocationModel';
import {remoteDBService} from '../data/remote/RequestGateway';

class LocationService {
  private currentUser: string = '';

  start(user: string): void {
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
        // this.locationStatus = 'Permission Denied';
      }
    } catch (err) {
      console.warn(err);
    }

    return false;
  }

  private subscribeLocationLocation = (): void => {
    const watchID = Geolocation.watchPosition(
      async position => {
        const locationStamp = geolocationResponseToLocation(
          position,
          this.currentUser,
        );

        const headers = {
          'Content-type': 'application/json',
        };

        const response = await remoteDBService().post<LocationResponse>(
          '/location',
          locationStamp,
          headers,
        );
      },
      error => {
        // console.log(error.message);
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
