import React, {useContext, useState, useRef} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../../appearance/styles/MashesStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';
import LabelComponent from '../transferposting/components/LabelComponent';
import ManualLabelInputModal from '../../utilities/components/ManualLabelInputModal';
import Repository from '../../data/Repository';
import {useAppDispatch} from '../../redux/Store';
import {Label, MaterialDocument} from '../../shared/Types';
import {
  GOODS_MOVEMENT_CODE,
  MOVEMENT_TYPE,
  PRODUCTION_ORDER,
  STORAGE_LOCATION,
} from '../../shared/Constants';
import {setGoodsMovementLog} from '../../redux/actions/GoodsMovementLogActions';

function Mashes({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [scannedLabels, setScannedLabels] = useState<Label[]>([]);
  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState<boolean>(false);

  const scannerRef = useRef<TextInput>(null);
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

  const addLabel = async (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      const [materialNumber, batch, quantityString] =
        lastScannedBarcode.split('-');
      const quantity = Number(quantityString.replace(',', '.'));

      const validity = await checkInventoryAvailability(
        materialNumber,
        batch,
        STORAGE_LOCATION.BUILDING_C_YARD,
      );

      if (scannedLabels.length > 0) {
        setScannedLabels([
          ...scannedLabels,
          {
            count: scannedLabels[scannedLabels.length - 1].count + 1,
            materialNumber: materialNumber,
            batch: batch,
            quantity: quantity,
            validity: validity,
          },
        ]);
      } else {
        setScannedLabels([
          {
            count: 1,
            materialNumber: materialNumber,
            batch: batch,
            quantity: quantity,
            validity: validity,
          },
        ]);
      }
    }
  };

  const removeLabel = (index: number) => {
    const updatedLabels = scannedLabels.filter((item, i) => i !== index);

    if (updatedLabels) {
      setScannedLabels([]);
      setScannedLabels(updatedLabels);
    }
  };

  const resetScreenComponents = () => {
    setScannedLabels([]);
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
    };

    if (labels.length > 0) {
      return submitGoodsMovement(labels, stgLocIn, stgLocOut);
    } else {
      Alert.alert('Σφάλμα', 'Αδειο παραστατικό');
    }
  };

  return (
    <View style={styles(theme).mashesContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Πραγματοποιείται ενδοδιακίνιση...'}
        textStyle={{color: 'white'}}
      />

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
                STORAGE_LOCATION.BUILDING_C_YARD,
                STORAGE_LOCATION.BUILDING_C_SCRAP,
              );
              setIsLoading(false);

              if (goodsMovementLog) {
                dispatch(setGoodsMovementLog(goodsMovementLog));

                navigation.navigate('TransferPostingLog', [
                  goodsMovementLog,
                  STORAGE_LOCATION.BUILDING_C_YARD,
                  STORAGE_LOCATION.BUILDING_C_YARD,
                ]);
              } else {
                if (scannedLabels.length > 0) {
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

export default React.memo(Mashes);
