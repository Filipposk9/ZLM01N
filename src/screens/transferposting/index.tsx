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
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
import LabelComponent from './components/LabelComponent';
import ManualLabelInputModal from '../../utilities/components/ManualLabelInputModal';
import Repository from '../../data/Repository';
import {Label, MaterialDocument} from '../../shared/Types';
import {
  GOODS_MOVEMENT_CODE,
  MOVEMENT_TYPE,
  PRODUCTION_ORDER,
} from '../../shared/Constants';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {styles} from '../../appearance/styles/TransferPostingStyles';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import {useAppDispatch} from '../../redux/Store';
import {setGoodsMovementLog} from '../../redux/actions/GoodsMovementLogActions';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';

function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');
  const [storageLocationInKey, setStorageLocationInKey] = useState(99999);
  const [storageLocationOutKey, setStorageLocationOutKey] = useState(0);

  const scannerRef = useRef<TextInput>(null);

  const [scannedLabels, setScannedLabels] = useState<Label[]>([]);

  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const checkInventoryAvailability = async (
    materialNumber: string,
    batch: string,
    storageLocation: string,
  ): Promise<boolean> => {
    const batchData = await Repository.getBatchData(
      materialNumber,
      batch,
      storageLocation,
    );

    if (batchData && batchData.quantity > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onStorageLocationInChange = async (storageLocationIn: string) => {
    setStorageLocationIn(storageLocationIn);

    const updatedLabels: Label[] = await Promise.all(
      scannedLabels.map(async label => {
        const validity = await checkInventoryAvailability(
          label.materialNumber,
          label.batch,
          storageLocationIn,
        );

        return {
          ...label,
          validity,
        };
      }),
    );

    if (updatedLabels && updatedLabels.length > 0) {
      setScannedLabels([]);
      setScannedLabels(updatedLabels);
    }
  };

  const onStorageLocationOutChange = (storageLocationOut: string) => {
    setStorageLocationOut(storageLocationOut);
  };

  const storageLocationsAreValid = (stgLocIn: string, stgLocOut: string) => {
    return stgLocIn !== '' && stgLocOut !== '' && stgLocIn !== stgLocOut;
  };

  const addLabel = async (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      const [materialNumber, batch, quantityString] =
        lastScannedBarcode.split('-');
      const quantity = Number(quantityString.replace(',', '.'));

      const validity = await checkInventoryAvailability(
        materialNumber,
        batch,
        storageLocationIn,
      );

      const newLabel = {
        count: 1,
        materialNumber: materialNumber,
        batch: batch,
        quantity: quantity,
        validity: validity,
      };

      setScannedLabels(
        scannedLabels.length > 0
          ? [
              ...scannedLabels,
              {
                ...newLabel,
                count: scannedLabels[scannedLabels.length - 1].count + 1,
              },
            ]
          : [newLabel],
      );
    }
  };

  const removeLabel = (index: number) => {
    const updatedLabels = scannedLabels.filter((_item, i) => i !== index);

    if (updatedLabels) {
      setScannedLabels([]);
      setScannedLabels(updatedLabels);
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

      <View style={styles(theme).storageLocationDropDownContainer}>
        <View style={{width: '50%'}}>
          <StorageLocationDropdown
            key={storageLocationInKey}
            placeholder={'Προέλευση'}
            onChange={onStorageLocationInChange}
          />
        </View>
        <View style={{width: '50%'}}>
          <StorageLocationDropdown
            key={storageLocationOutKey}
            placeholder={'Προορισμός'}
            onChange={onStorageLocationOutChange}
          />
        </View>
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

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            addLabel(lastScannedBarcode);
          }}
          validator={lastScannedBarcode =>
            BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
          }
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }
        style={styles(theme).labelList}>
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              if (item) {
                return (
                  <LabelComponent
                    key={item.count}
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
        editable={true}
        onSubmit={lastScannedBarcode => {
          addLabel(lastScannedBarcode);
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
                dispatch(setGoodsMovementLog(goodsMovementLog));

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
