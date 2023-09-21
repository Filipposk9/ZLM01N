import React, {useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import AzureAuth from 'react-native-azure-auth';
import {uploadSmallFile} from '@harrisoff/onedrive-js-sdk';
import RNFS from 'react-native-fs';
import ImagePreviewModal from './ImagePreviewModal';
import {Buffer} from 'buffer';
import Icon from 'react-native-vector-icons/FontAwesome';

function ViewFinder({route}: {route: any}): JSX.Element {
  const outboundDeliveryNumber = route.params;

  const cameraRef = useRef<Camera>(null);

  const [scaling, setScaling] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const devices = useCameraDevices();
  const device = devices.back;

  const [cameraIsActive, setCameraIsActive] = useState<boolean>(true);

  const [uID, setUID] = useState<string>('');

  const [previewImageVisibility, setPreviewImageVisibility] =
    useState<boolean>(false);
  const [previewImagePath, setPreviewImagePath] = useState<string>('');

  const deleteCachedImage = () => {
    setPreviewImageVisibility(false);
    RNFS.unlink(previewImagePath);
    setCameraIsActive(true);
  };

  const prepareImageForUpload = async () => {
    const lastImageTaken = await RNFS.readFile(previewImagePath, 'base64');

    const buffer = Buffer.from(lastImageTaken, 'base64');

    if (buffer) {
      return buffer;
    } else {
      return undefined;
    }
  };

  const uploadCachedImageToOnedrive = async (buffer: Buffer) => {
    const azureAuth = new AzureAuth({
      clientId: 'b7c14ee8-9bc0-4e9e-b32e-3f5a5e2eaeb3',
      tenant: '1c32b97c-c0df-4764-83e5-b85512702173',
      redirectUri: 'com.zlm01n://com.zlm01n/android/callback',
    });

    let accessToken;

    try {
      // Try to get cached accessToken or refresh an expired one
      if (uID && uID !== '') {
        const cachedTokens = await azureAuth.auth.acquireTokenSilent({
          scope: 'openid profile User.ReadWrite Files.ReadWrite.All',
          userId: uID,
        });

        if (cachedTokens) {
          accessToken = cachedTokens.accessToken;
        }
      } else {
        // No cached tokens or the requested scope defines new not yet consented permissions
        // Open a window for user interaction
        const newTokens = await azureAuth.webAuth.authorize({
          scope: 'openid profile User.ReadWrite Files.ReadWrite.All',
        });

        if (newTokens !== undefined) {
          setUID(newTokens.userId);

          accessToken = newTokens.accessToken;
        }
      }
    } catch (error) {
      console.log(error);
    }

    //Upload to Onedrive using whatever accessToken is available

    if (accessToken) {
      const fileName = previewImagePath.split('/');
      const fileNameWithExtension = fileName[fileName.length - 1];

      if (buffer) {
        await uploadSmallFile(
          buffer,
          '/Loadings/' + outboundDeliveryNumber + '/' + fileNameWithExtension,
          accessToken,
        );
      }
    }
  };

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
      }}>
      <Spinner
        visible={isLoading}
        textContent={'Ανέβασμα εικόνας...'}
        textStyle={{color: 'white'}}></Spinner>

      {device === undefined ? (
        <></>
      ) : (
        <Camera
          style={{height: '80%'}}
          ref={cameraRef}
          device={device}
          isActive={cameraIsActive}
          photo={true}
          video={false}
          zoom={0}
          enableHighQualityPhotos={true}></Camera>
      )}

      <ImagePreviewModal
        visibility={previewImageVisibility}
        image={previewImagePath}
        onSwipeLeft={() => {
          deleteCachedImage();
        }}
        onSwipeRight={async () => {
          setIsLoading(true);

          const image = await prepareImageForUpload();

          if (image) {
            await uploadCachedImageToOnedrive(image);
          }

          setPreviewImageVisibility(false);
          setCameraIsActive(true);

          setIsLoading(false);
        }}
        onBackPress={() => {
          setPreviewImageVisibility(false);
          setCameraIsActive(true);
        }}></ImagePreviewModal>

      <View
        style={{
          height: '20%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            width: '100%',
          }}
          onPress={async () => {
            const photo = await cameraRef.current?.takePhoto({
              qualityPrioritization: 'quality',
            });

            if (photo !== undefined) {
              setCameraIsActive(false);

              setPreviewImagePath(photo.path);
              setPreviewImageVisibility(true);
            }
          }}
          onTouchStart={() => {
            setScaling(0.9);
          }}
          onTouchEnd={() => {
            setScaling(1);
          }}>
          <Icon
            style={{
              zIndex: 1,
              position: 'absolute',
              top: -70,
              left: '36.5%',
            }}
            name={'circle-thin'}
            color={'white'}
            size={110}></Icon>
          <Icon
            style={{
              zIndex: 1,
              position: 'absolute',
              top: scaling === 1 ? -58 : -53,
              left: scaling === 1 ? '39.4%' : '40.7%',
            }}
            name={'circle'}
            color="white"
            size={scaling === 1 ? 85 : 75}></Icon>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(ViewFinder);
