import React, {useRef, useState} from 'react';
import {Pressable, View, StyleSheet, BackHandler} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import ImagePreviewModal from './ImagePreviewModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';

interface ViewFinderProps {
  onPreviewSwipeLeft: () => void;
  onPreviewSwipeRight: () => void;
  onImageCaptured: (path: string) => void;
  onViewFinderBackPress: () => void;
}

function ViewFinder(props: ViewFinderProps): JSX.Element {
  const {
    onPreviewSwipeLeft,
    onPreviewSwipeRight,
    onImageCaptured,
    onViewFinderBackPress,
  } = props;

  const [scaling, setScaling] = useState<number>(1);

  const devices = useCameraDevices();
  const device = devices.back;

  const cameraRef = useRef<Camera>(null);

  const [cameraIsActive, setCameraIsActive] = useState<boolean>(true);
  const [previewIsOpen, setPreviewIsOpen] = useState<boolean>(false);

  const [lastCapturedImage, setLastCapturedImage] = useState<string>('');

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = (): boolean => {
        onViewFinderBackPress();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, []),
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          height: '100%',
          justifyContent: 'flex-end',
          backgroundColor: 'black',
        }}>
        {device !== undefined ? (
          <Camera
            style={{height: '100%'}}
            ref={cameraRef}
            device={device}
            isActive={cameraIsActive}
            photo={true}
            video={false}
            zoom={0}
            enableHighQualityPhotos={true}
            orientation="portrait"></Camera>
        ) : (
          <></>
        )}

        {previewIsOpen ? (
          <ImagePreviewModal
            visibility={previewIsOpen}
            image={lastCapturedImage}
            onSwipeLeft={() => {
              setPreviewIsOpen(false);
              onPreviewSwipeLeft();
              setCameraIsActive(true);
            }}
            onSwipeRight={() => {
              setPreviewIsOpen(false);
              onPreviewSwipeRight();
              setCameraIsActive(true);
            }}
            onBackPress={() => {
              setPreviewIsOpen(false);
              RNFS.unlink(lastCapturedImage);
              setCameraIsActive(true);
            }}></ImagePreviewModal>
        ) : (
          <></>
        )}

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
                setLastCapturedImage(photo.path);

                setCameraIsActive(false);
                onImageCaptured(photo.path);
                setPreviewIsOpen(true);
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
                top: -50,
                left: '36.5%',
              }}
              name={'circle-thin'}
              color={'white'}
              size={110}></Icon>
            <Icon
              style={{
                zIndex: 1,
                position: 'absolute',
                top: scaling === 1 ? -38 : -33,
                left: scaling === 1 ? '39.4%' : '40.7%',
              }}
              name={'circle'}
              color="white"
              size={scaling === 1 ? 85 : 75}></Icon>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default React.memo(ViewFinder);
