import React, {useState} from 'react';
import {Image, PanResponder, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ImagePreviewModalProps {
  visibility: boolean;
  image: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onBackPress: () => void;
}

function ImagePreviewModal(props: ImagePreviewModalProps): JSX.Element {
  const {visibility, image, onSwipeLeft, onSwipeRight, onBackPress} = props;

  const [swipeRegistered, setSwipeRegistered] = useState<boolean>(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (!swipeRegistered) {
        if (gestureState.dx > 50) {
          onSwipeLeft();
          setSwipeRegistered(true);
        } else if (gestureState.dx < -50) {
          onSwipeRight();
          setSwipeRegistered(true);
        }
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <Modal
      isVisible={visibility}
      onModalShow={() => setSwipeRegistered(false)}
      onBackButtonPress={onBackPress}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          {...panResponder?.panHandlers}
          source={image ? {uri: 'file://' + image} : {uri: ''}}
          style={{width: '100%', height: '100%'}}
        />

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '80%',
            transform: [{translateY: -25}],
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              paddingLeft: 10,
            }}>
            <Icon
              style={{zIndex: 1}}
              name={'keyboard-arrow-left'}
              color={'white'}
              size={60}
            />

            <Text style={{fontSize: 16, color: 'white'}}>
              {'Ανέβασμα σε \nOnedrive'}
            </Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
            <Icon
              style={{zIndex: 1}}
              name={'keyboard-arrow-right'}
              color={'white'}
              size={60}
            />

            <Text style={{fontSize: 16, color: 'white'}}>Διαγραφή</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default React.memo(ImagePreviewModal);
