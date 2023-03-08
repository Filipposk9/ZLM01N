import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';

function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const dispatcher = useAppDispatch();

  const {theme} = useContext(ThemeContext);
  //TODO: transferPostingQueue in redux-persist?

  const [isLoading, setIsLoading] = useState(false);

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');

  const scannerRef = useRef<TextInput>(null);

  const goodsMovementQueue = useSelector(
    (state: GoodsMovementQueueState) => state.goodsMovementQueue,
  );

  const [scannedLabels, setScannedLabels] = useState<Label[]>([]);

  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState(false);

  useFocusEffect(() => {
    scannerRef.current?.focus();
  });

  const onStorageLocationInChange = (storageLocationIn: string) => {
    setStorageLocationIn(storageLocationIn);

    const fetchBatchData = async (
      materialNumber: string,
      batch: string,
      storageLocation: string,
      count: number,
    ) => {
      const batchData = await Repository.getBatchData(
        materialNumber,
        batch,
        storageLocation,
      );

      editLabelValidity(batchData, count);
    };

    const editLabelValidity = (batchdata: any, count: number) => {
      const nextState: Label[] = scannedLabels.map((c, i) => {
        if (i === count - 1) {
          if (batchdata.quantity > 0) {
            c.validity = true;
          } else {
            c.validity = false;
          }
        }
        if (c !== undefined) {
          return c;
        }
      });

      setScannedLabels(nextState);
    };

    for (const label of scannedLabels) {
      fetchBatchData(
        label.materialNumber,
        label.batch,
        storageLocationIn,
        label.count,
      );
    }
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

  //TODO: get initial stock value

  const addLabel = (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      if (scannedLabels !== undefined) {
        setScannedLabels([
          ...scannedLabels,
          {
            count: scannedLabels.length + 1,
            materialNumber: lastScannedBarcode.split('-')[0],
            batch: lastScannedBarcode.split('-')[1],
            quantity: Number(
              lastScannedBarcode.split('-')[2].replace(',', '.'),
            ),
            validity: false,
          },
        ]);
      } else {
        setScannedLabels([
          {
            count: 1,
            materialNumber: lastScannedBarcode.split('-')[0],
            batch: lastScannedBarcode.split('-')[1],
            quantity: Number(
              lastScannedBarcode.split('-')[2].replace(',', '.'),
            ),
            validity: false,
          },
        ]);
      }
    }
  };

  const removeLabel = (index: number) => {
    // //FIXME: material texts dont slide because state does not update

    let j = 1;

    const nextState = scannedLabels.map((c, i) => {
      if (i !== index) {
        c.count = j++;
        return c;
      }
    });

    const filteredState: Label[] = nextState.filter(item => item !== undefined);

    if (filteredState !== undefined) {
      setScannedLabels(filteredState);
    }
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

  //TODO: put into queue INSTANTLY onSubmit(), dont rely on current storageLocationIn&Out

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
    <View
      onTouchStart={handleQueueEntries}
      style={styles(theme).transferPostingContainer}>
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

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            addLabel(lastScannedBarcode);
          }}
        />
      </View>

      <View style={styles(theme).middleContainer}>
        <Text style={styles(theme).labelListHeaderText}>Λίστα ετικετών</Text>

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

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles(theme).labelList}>
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              return (
                <LabelComponent
                  key={i}
                  count={item.count}
                  barcode={
                    item.materialNumber + '-' + item.batch + '-' + item.quantity
                  }
                  validity={scannedLabels[i].validity}
                  onDeletePressed={() => removeLabel(i)}
                />
              );
            })
          : null}
      </ScrollView>

      <ManualLabelInputModal
        visibility={manualLabelInputVisibility}
        onSubmit={barcode => {
          addLabel(barcode);
          setManualLabelInputVisibility(false);
        }}
      />

      {/* Submit form to SAP */}
      <View style={styles(theme).bottomContainer}>
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
    </View>
  );
}

export default React.memo(TransferPosting);
