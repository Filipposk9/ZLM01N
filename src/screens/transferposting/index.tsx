import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
import LabelComponent from './components/LabelComponent';
import ManualLabelInputModal from './components/ManualLabelInputModal';
import Repository from '../../data/Repository';
import {Label, MaterialDocument} from '../../shared/Types';
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
  const {theme} = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(false);

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');
  const [storageLocationInKey, setStorageLocationInKey] = useState(99999);
  const [storageLocationOutKey, setStorageLocationOutKey] = useState(0);

  const scannerRef = useRef<TextInput>(null);

  const [scannedLabels, setScannedLabels] = useState<Label[]>([]);

  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState(false);

  //TODO: keyboard pops up when switching apps

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

      if (batchData) {
        editLabelValidity(batchData, count);
      }
    };

    const editLabelValidity = (batchdata: any, count: number) => {
      const nextState: Label[] = scannedLabels?.map((c, i) => {
        if (c) {
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
        }
      });

      setScannedLabels(nextState);
    };

    for (const label of scannedLabels) {
      if (label) {
        fetchBatchData(
          label.materialNumber,
          label.batch,
          storageLocationIn,
          label.count,
        );
      }
    }
  };

  const onStorageLocationOutChange = (storageLocationOut: string) => {
    setStorageLocationOut(storageLocationOut);
  };

  const storageLocationsAreValid = (stgLocIn: string, stgLocOut: string) => {
    if (stgLocIn !== '' && stgLocOut !== '') {
      if (stgLocIn !== stgLocOut) {
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

    const nextState: Label[] = scannedLabels.map((c, i) => {
      if (i !== index) {
        if (c) {
          c.count = j++;
          return c;
        }
      }
    });

    const filteredState = nextState.filter(item => item !== undefined);

    if (filteredState !== undefined) {
      setScannedLabels(filteredState);
    }
  };

  const resetScreenComponents = () => {
    setScannedLabels([]);
    setStorageLocationInKey(storageLocationInKey - 1);
    setStorageLocationIn('');
    setStorageLocationOutKey(storageLocationOutKey + 1);
    setStorageLocationOut('');
  };

  const submitGoodsMovement = (
    labels: Label[],
    stgLocIn: string,
    stgLocOut: string,
  ) => {
    //TODO: add current user param

    const submitGoodsMovement = async (
      labels: Label[],
      stgLocIn: string,
      stgLocOut: string,
    ): Promise<MaterialDocument | undefined> => {
      if (storageLocationsAreValid(stgLocIn, stgLocOut)) {
        const materialDocument = await Repository.createGoodsMovement(
          GOODS_MOVEMENT_CODE.TRANSFER_POSTING,
          labels,
          stgLocIn,
          stgLocOut,
          MOVEMENT_TYPE.TRANSFER_POSTING,
          PRODUCTION_ORDER.BLANK,
        );

        resetScreenComponents();

        return materialDocument;
      } else {
        Alert.alert('Σφάλμα', 'Εισάγετε αποθηκευτικό χώρο');
      }
    };

    if (labels.length > 0) {
      return submitGoodsMovement(labels, stgLocIn, stgLocOut);
    } else {
      Alert.alert('Σφάλμα', 'Αδειο παραστατικό');
    }
  };

  return (
    <View style={styles(theme).transferPostingContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Πραγματοποιείται ενδοδιακίνιση...'}
        textStyle={{color: 'white'}}
      />

      <StorageLocationDropdown
        key={storageLocationInKey}
        placeholder={'Αποθηκευτικός χώρος προέλευσης'}
        onChange={onStorageLocationInChange}
      />
      <StorageLocationDropdown
        key={storageLocationOutKey}
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
              if (item) {
                return (
                  <LabelComponent
                    key={i}
                    count={item.count}
                    barcode={
                      item.materialNumber +
                      '-' +
                      item.batch +
                      '-' +
                      item.quantity
                    }
                    validity={item.validity}
                    onDeletePressed={() => removeLabel(i)}
                  />
                );
              }
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

              if (goodsMovementLog) {
                navigation.navigate('TransferPostingLog', [
                  goodsMovementLog,
                  storageLocationIn,
                  storageLocationOut,
                ]);
              } else {
                if (
                  scannedLabels.length > 0 &&
                  storageLocationsAreValid(
                    storageLocationIn,
                    storageLocationOut,
                  )
                ) {
                  resetScreenComponents();
                  Alert.alert(
                    'Ανεπαρκές Σήμα',
                    'Το παραστατικό προστέθηκε στην ουρά',
                  );
                }
              }
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
