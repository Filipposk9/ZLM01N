import React, {useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

function ViewFinder({navigation}: {route: any; navigation: any}): JSX.Element {
  const cameraRef = useRef<Camera>(null);

  const [scaling, setScaling] = useState<number>(1);

  const devices = useCameraDevices();
  const device = devices.back;

  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'black',
      }}>
      {device === undefined ? (
        <></>
      ) : (
        <Camera
          style={{height: '80%'}}
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          video={false}></Camera>
      )}

      <View
        style={{
          height: '20%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          style={{width: '25%'}}
          onPress={async () => {
            const photo = await cameraRef.current?.takePhoto({
              qualityPrioritization: 'quality',
            });

            if (photo !== undefined) {
              const newPhotos = [...photos];
              newPhotos.push(photo.path);
              setPhotos(newPhotos);
            }
          }}
          onTouchStart={() => {
            setScaling(0.9);
          }}
          onTouchEnd={() => {
            setScaling(1);
          }}>
          <Text
            style={{
              height: 90,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            }}></Text>

          <Text
            style={{
              zIndex: 1,
              marginTop: scaling === 1 ? '-94%' : '-89%',
              marginLeft: scaling === 1 ? '5.5%' : '11%',
              height: scaling === 1 ? 80 : 70,
              width: scaling === 1 ? 80 : 70,
              borderRadius: 50,
              backgroundColor: 'white',
            }}></Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(ViewFinder);
