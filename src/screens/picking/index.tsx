import React, {useContext, useState, useRef} from 'react';
import {View, Text, TextInput, Alert, FlatList, Pressable} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../appearance/styles/PickingStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import Repository from '../../data/Repository';
import {OutboundDelivery} from '../../shared/Types';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';
import SapStructureValidator from '../../utilities/validators/SapStructureValidator';
import OutboundDeliveryItemComponent from './components/OutboundDeliveryItemComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Camera} from 'react-native-vision-camera';
import ViewFinder from '../../utilities/components/ViewFinder';
import RNFS from 'react-native-fs';
import OnedriveConnector from '../../data/remote/OnedriveConnector';
import {AZURE_AUTH} from '../../shared/Constants';
import {Buffer} from '@craftzdog/react-native-buffer';

function Picking({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outboundDelivery, setOutboundDelivery] = useState<string>('');
  const [outboundDeliveryData, setOutboundDeliveryData] = useState<
    OutboundDelivery | undefined
  >();

  const [outboundDeliveryEditability, setOutboundDeliveryEditability] =
    useState<boolean>(true);

  const scannerRef = useRef<TextInput>(null);
  const itemListRef = useRef<FlatList>(null);

  const [viewFinderIsOpen, setViewFinderIsOpen] = useState<boolean>(false);

  const [capturedImagePath, setCapturedImagePath] = useState<
    string | undefined
  >('');

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const getOutboundDeliveryData = () => {
    const getOutboundDeliveryData = async () => {
      if (SapStructureValidator.validateOutboundDelivery(outboundDelivery)) {
        const response = await Repository.getOutboundDelivery(outboundDelivery);

        if (response !== undefined) {
          response.items.sort((a, b) => a.positionNumber - b.positionNumber);

          setOutboundDeliveryData(response);
        }
      } else {
        Alert.alert('Λάθος αριθμός παράδοσης');
      }
    };

    getOutboundDeliveryData();
  };

  const pickLabel = (lastScannedBarcode: string) => {
    const pickLabel = async (lastScannedBarcode: string) => {
      if (lastScannedBarcode !== '') {
        if (outboundDeliveryData?.header.status === 'C') {
          Alert.alert('To picking έχει ήδη ολοκληρωθεί');
        } else {
          if (lastScannedBarcode.includes('-')) {
            lastScannedBarcode = lastScannedBarcode.replace(',', '.');
          }

          setIsLoading(true);

          const response = await Repository.createPickingRequest(
            outboundDelivery,
            lastScannedBarcode,
          );

          if (response !== undefined) {
            if (response.code === 0) {
              getOutboundDeliveryData();
              setIsLoading(false);

              const scannedIndex = outboundDeliveryData?.items.findIndex(
                item => item.positionNumber === response.positionNumberHandled,
              );

              if (scannedIndex) {
                itemListRef.current?.scrollToIndex({
                  index: scannedIndex,
                  animated: true,
                });
              }
            } else {
              setIsLoading(false);
              Alert.alert(response.message);
            }
          }
        }
      }
    };
    pickLabel(lastScannedBarcode);
  };

  const deleteCapturedImage = () => {
    if (capturedImagePath) {
      RNFS.unlink(capturedImagePath);
    }
    setCapturedImagePath(undefined);
  };

  const uploadCapturedImageToOnedrive = async () => {
    setIsUploading(true);

    const onedriveConnection = await OnedriveConnector.initializeConnection(
      AZURE_AUTH,
    );

    if (onedriveConnection && capturedImagePath) {
      const imageFile = await RNFS.readFile(capturedImagePath, 'base64');

      if (imageFile) {
        const buffer = Buffer.from(imageFile, 'base64');

        setIsUploading(false);

        RNFS.unlink(capturedImagePath);

        const fileName = capturedImagePath.split('/');
        const fileNameWithExtension = fileName[fileName.length - 1];

        setCapturedImagePath(undefined);

        const onedriveResponse = await OnedriveConnector.uploadImage(
          buffer,
          '/Loadings/' + outboundDelivery + '/' + fileNameWithExtension,
        );

        if (onedriveResponse) {
          // console.log(onedriveResponse, 'uploaded');
          //TODO: refreshing.... show info
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {viewFinderIsOpen ? (
        <>
          <Spinner
            visible={isUploading}
            textContent={'Uploading...'}
            textStyle={{color: 'white'}}
          />
          <ViewFinder
            onPreviewSwipeLeft={deleteCapturedImage}
            onPreviewSwipeRight={uploadCapturedImageToOnedrive}
            onImageCaptured={(path: string) => {
              setCapturedImagePath(path);
            }}
            onViewFinderBackPress={() => {
              setViewFinderIsOpen(false);
            }}></ViewFinder>
        </>
      ) : (
        <View style={styles(theme).pickingContainer}>
          <Spinner
            visible={isLoading}
            textContent={'Picking...'}
            textStyle={{color: 'white'}}
          />

          <View style={styles(theme).outboundDeliveryInputContainer}>
            <Text style={styles(theme).outboundDeliveryInput}>Παράδοση: </Text>
            <View onTouchStart={() => setOutboundDeliveryEditability(true)}>
              <TextInput
                style={styles(theme).outboundDeliveryInputField}
                keyboardType="number-pad"
                editable={outboundDeliveryEditability}
                onChangeText={outboundDelivery => {
                  if (outboundDelivery.substring(0, 1) !== '8') {
                  } else {
                    setOutboundDelivery(outboundDelivery);
                  }
                }}
                onSubmitEditing={() => {
                  getOutboundDeliveryData();
                  setOutboundDeliveryEditability(false);
                }}
                value={outboundDelivery}></TextInput>
            </View>
          </View>

          <View style={styles(theme).topContainer}>
            <View style={styles(theme).outboundDeliveryHeaderContainer}>
              <View style={styles(theme).outboundDeliveryHeaderItem}>
                <Text style={styles(theme).outboundDeliveryHeaderTextLeft}>
                  <Text style={{fontWeight: 'bold', fontSize: 22}}>
                    Πελάτης
                  </Text>
                  {'                 '}
                  {outboundDeliveryData?.header.customerName}
                </Text>
              </View>
              <View style={styles(theme).outboundDeliveryHeaderItem}>
                <Text style={styles(theme).outboundDeliveryHeaderTextRight}>
                  <Text style={{fontWeight: 'bold', fontSize: 22}}>
                    Προορισμός
                  </Text>
                  {'                 '}
                  {outboundDeliveryData?.header.shipToPartyName}
                </Text>
              </View>
            </View>

            <View style={styles(theme).outboundDeliveryHeaderContainer}>
              <View style={styles(theme).outboundDeliveryHeaderItem}>
                <Text
                  style={[
                    styles(theme).outboundDeliveryStatusText,
                    {
                      color:
                        outboundDeliveryData?.header.status === 'C'
                          ? '#C17161'
                          : '#94BA78',
                    },
                  ]}>
                  Picking Status: {outboundDeliveryData?.header.status}
                </Text>
              </View>
              <View style={styles(theme).outboundDeliveryHeaderItem}>
                <Pressable
                  style={styles(theme).outboundDeliveryCameraButton}
                  onPress={async () => {
                    if (
                      SapStructureValidator.validateOutboundDelivery(
                        outboundDelivery,
                      )
                    ) {
                      const cameraPermission =
                        await Camera.requestCameraPermission();
                      const microphonePermission =
                        await Camera.requestMicrophonePermission();

                      if (
                        cameraPermission === 'granted' &&
                        microphonePermission === 'granted'
                      ) {
                        setViewFinderIsOpen(true);
                      }
                    } else {
                      Alert.alert('Παρακαλώ συμπληρώστε αριθμό παράδοσης');
                    }
                  }}>
                  <Text style={styles(theme).outboundDeliveryHeaderTextRight}>
                    Στιγμιότυπα φόρτωσης
                  </Text>
                  <Icon name={'linked-camera'} color={'white'} size={30}></Icon>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles(theme).outboundDeliveryLinesContainer}>
            <FlatList
              ref={itemListRef}
              data={outboundDeliveryData?.items}
              renderItem={({item}) => (
                <OutboundDeliveryItemComponent
                  item={item}></OutboundDeliveryItemComponent>
              )}></FlatList>
          </View>

          <View style={{height: 0}}>
            <BarcodeScanner
              reference={scannerRef}
              onScan={lastScannedBarcode => {
                if (outboundDelivery !== '') {
                  pickLabel(lastScannedBarcode);
                }
              }}
              validator={lastScannedBarcode =>
                BarcodeValidator.validatePalletLabel(lastScannedBarcode) ||
                BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
              }
            />
          </View>
        </View>
      )}
    </>
  );
}

export default React.memo(Picking);
