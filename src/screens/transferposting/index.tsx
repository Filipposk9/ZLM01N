import React, {useContext, useRef, useState} from 'react';
import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
import LabelComponent from './components/LabelComponent';
import ManualLabelInputModal from './components/ManualLabelInputModal';
import {useAppDispatch} from '../../redux/Store';
import {useSelector} from 'react-redux';
import {setGoodsMovementLog} from '../../redux/actions/GoodsMovementLogActions';
import {
  setGoodsMovementQueue,
  resetGoodsMovementQueue,
} from '../../redux/actions/GoodsMovementQueueActions';
import Repository from '../../data/Repository';
import {GoodsMovementQueue, Label, MaterialDocument} from '../../shared/Types';
import {GoodsMovementQueueState} from '../../redux/ReduxTypes';
import {
  GOODS_MOVEMENT_CODE,
  MOVEMENT_TYPE,
  PRODUCTION_ORDER,
} from '../../shared/Constants';
import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from '../../styles/TransferPostingStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';

//TODO: props: TransferPostingProps
function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const dispatcher = useAppDispatch();

  const {theme} = useContext(ThemeContext);
  //TODO: transferPostingQueue in redux-persist?

  const [isLoading, setIsLoading] = useState(false);

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');

  const scannerRef = useRef(null);

  const goodsMovementQueue = useSelector(
    (state: GoodsMovementQueueState) => state.goodsMovementQueue,
  );

  const [scannedLabels, setScannedLabels] = useState<Label[]>([
    {
      count: 1,
      materialNumber: '210000521',
      batch: '11111CU123',
      quantity: 150,
    },
    {
      count: 2,
      materialNumber: '210000521',
      batch: '11111CU123',
      quantity: 150,
    },
  ]);

  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState(false);

  const onStorageLocationInChange = (storageLocationIn: string) => {
    setStorageLocationIn(storageLocationIn);
  };

  const onStorageLocationOutChange = (storageLocationOut: string) => {
    setStorageLocationOut(storageLocationOut);
  };

  const storageLocationsAreValid = () => {
    if (storageLocationIn && storageLocationOut) {
      if (storageLocationIn !== storageLocationOut) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const addLabel = (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      setScannedLabels([
        ...scannedLabels,
        {
          count: scannedLabels.length + 1,
          materialNumber: lastScannedBarcode.split('-')[0],
          batch: lastScannedBarcode.split('-')[1],
          quantity: Number(lastScannedBarcode.split('-')[2].replace(',', '.')),
        },
      ]);
    }
  };

  const removeLabel = (i: number) => {
    let currentScannedLabels: Label[] = scannedLabels;
    let j = 1;

    currentScannedLabels.splice(i, 1);

    console.log(currentScannedLabels);

    for (const label of currentScannedLabels) {
      label.count = j++;
    }

    //FIXME: state doesnt update, material texts dont slide

    setScannedLabels(currentScannedLabels);
  };

  const getConnectionDetails = () => {
    async function getConnectionDetails() {
      return await NetInfo.fetch().then(async state => {
        return state.details;
      });
    }

    return getConnectionDetails();
  };

  const submitGoodsMovement = (
    scannedLabels: Label[],
    storageLocationIn: string,
    storageLocationOut: string,
  ) => {
    //TODO: add current user param
    //TODO: get all material texts and cache them

    const submitGoodsMovement = async (): Promise<
      MaterialDocument | undefined
    > => {
      const connectionDetails = await getConnectionDetails();

      if (connectionDetails.strength >= 60) {
        const materialDocument = await Repository.createGoodsMovement(
          GOODS_MOVEMENT_CODE.TRANSFER_POSTING,
          scannedLabels,
          storageLocationIn,
          storageLocationOut,
          MOVEMENT_TYPE.TRANSFER_POSTING,
          PRODUCTION_ORDER.BLANK,
        );

        return materialDocument;
      } else {
        return undefined;
      }
    };

    if (storageLocationsAreValid()) {
      if (scannedLabels.length > 0) {
        return submitGoodsMovement();
      } else {
        Alert.alert('Άδειο παραστατικό');
        return undefined;
      }
    } else {
      Alert.alert('Εισάγετε αποθηκευτικό χώρο');
      return undefined;
    }
  };

  const handleGoodsMovementResponse = (
    materialDocument: MaterialDocument | undefined,
  ): void => {
    if (materialDocument !== undefined) {
      dispatcher(setGoodsMovementLog([materialDocument]));
    } else {
      if (storageLocationsAreValid()) {
        const goodsMovement = {
          goodsMovementCode: GOODS_MOVEMENT_CODE.TRANSFER_POSTING,
          scannedLabels,
          storageLocationIn,
          storageLocationOut,
          movementType: MOVEMENT_TYPE.TRANSFER_POSTING,
          productionOrder: PRODUCTION_ORDER.BLANK,
        };
        dispatcher(setGoodsMovementQueue([goodsMovement]));
      }
    }
  };

  const handleQueueEntries = async () => {
    let newGoodsMovementQueue: GoodsMovementQueue[] = [];

    if (goodsMovementQueue.goodsMovementQueue.length > 0) {
      for (const goodsMovementLog of goodsMovementQueue.goodsMovementQueue) {
        const materialDocument = await submitGoodsMovement(
          goodsMovementLog.scannedLabels,
          goodsMovementLog.storageLocationIn,
          goodsMovementLog.storageLocationOut,
        );

        if (materialDocument === undefined) {
          newGoodsMovementQueue.push(goodsMovementLog);
        } else {
          dispatcher(setGoodsMovementLog([materialDocument]));
        }
      }

      dispatcher(resetGoodsMovementQueue());
      dispatcher(setGoodsMovementQueue(newGoodsMovementQueue));
    }
  };

  const unsubscribe = NetInfo.addEventListener(state => {
    //FIXME: determine queue handling interval
    if (state.details.strength >= 60) {
      //handleQueueEntries();
    }
  });

  unsubscribe();

  return (
    <View style={styles(theme).transferPostingContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Πραγματοποιείται ενδοδιακίνιση...'}
        textStyle={{color: 'white'}}
      />

      <StorageLocationDropdown
        placeholder={'Αποθηκευτικός χώρος προέλευσης'}
        onChange={onStorageLocationInChange}
      />
      <StorageLocationDropdown
        placeholder={'Αποθηκευτικός χώρος προορισμού'}
        onChange={onStorageLocationOutChange}
      />

      <BarcodeScanner
        reference={scannerRef}
        onScan={lastScannedBarcode => addLabel(lastScannedBarcode)}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: '40%'}}>
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              return (
                <LabelComponent
                  key={i}
                  count={item.count}
                  barcode={
                    item.materialNumber + '-' + item.batch + '-' + item.quantity
                  }
                  validity={false}
                  onDeletePressed={() => removeLabel(i)}
                />
              );
            })
          : null}
      </ScrollView>

      {/* Bottom panel */}
      <View style={styles(theme).bottomPanelContainer}>
        {/*Transfer Posting History Button */}
        <View style={styles(theme).historyButtonContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('History');
            }}
            style={styles(theme).historyButton}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).historyButtonText}>Ιστορικό</Text>
          </Pressable>
        </View>

        {/*Add Label Manually Button*/}
        <View style={styles(theme).addLabelButtonContainer}>
          <Pressable
            onPress={() => {
              setManualLabelInputVisibility(true);
            }}
            style={styles(theme).addLabelButton}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).addLabelButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <ManualLabelInputModal
        visibility={manualLabelInputVisibility}
        onSubmit={barcode => {
          addLabel(barcode);
          setManualLabelInputVisibility(false);
        }}
      />

      {/* Submit form to SAP */}
      <View style={styles(theme).submitButtonContainer}>
        <Pressable
          style={styles(theme).submitButton}
          onPress={async () => {
            setIsLoading(true);
            const goodsMovementLog = await submitGoodsMovement(
              scannedLabels,
              storageLocationIn,
              storageLocationOut,
            );
            setIsLoading(false);

            handleGoodsMovementResponse(goodsMovementLog);

            if (goodsMovementLog) {
              navigation.navigate('TransferPostingLog', [
                goodsMovementLog,
                storageLocationIn,
                storageLocationOut,
              ]);
            } else {
              if (storageLocationsAreValid()) {
                Alert.alert(
                  'Αδυναμία Σύνδεσης. Το παραστατικό προστέθηκε στην ουρά',
                );
              }
            }
            //TODO: delete screen after submit
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(TransferPosting);
