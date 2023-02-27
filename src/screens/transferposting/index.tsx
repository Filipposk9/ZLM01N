import React, {useContext, useRef, useState} from 'react';
import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
import LabelComponent from './components/LabelComponent';
import {useAppDispatch} from '../../redux/Store';
import {setGoodsMovementLog} from '../../redux/actions/GoodsMovementLogActions';
import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from '../../styles/TransferPostingStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import Repository from '../../data/Repository';
import {Label} from '../../shared/Types';
import {
  GOODS_MOVEMENT_CODE,
  MOVEMENT_TYPE,
  PRODUCTION_ORDER,
} from '../../shared/Constants';
import ManualLabelInputModal from './components/ManualLabelInputModal';

function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const dispatcher = useAppDispatch();

  const {theme} = useContext(ThemeContext);
  //transferPostingQueue in redux-persist?

  const [isLoading, setIsLoading] = useState(false);

  const barcodeScannerRef = useRef();
  const [lastScannedBarcode, setLastScannedBarcode] = useState('');

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');

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

  const focusBarcodeScanner = (e: any) => {
    e.preventDefault();
    /*if (barcodeScannerRef.current) {
      barcodeScannerRef.current.focus();
    }*/
  };

  const addLabel = (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      setScannedLabels([
        ...scannedLabels,
        {
          count: scannedLabels.length + 1,
          materialNumber: lastScannedBarcode.split('-')[0],
          batch: lastScannedBarcode.split('-')[1],
          quantity: Number(lastScannedBarcode.split('-')[2]),
        },
      ]);
    }
  };

  const submitGoodsMovement = (scannedLabels: Label[]) => {
    //TODO: add current user param
    //TODO: Repository should hold the log in queue

    const submitGoodsMovement = async () => {
      const materialDocument = await Repository.createGoodsMovement(
        GOODS_MOVEMENT_CODE.TRANSFER_POSTING,
        scannedLabels,
        storageLocationIn,
        storageLocationOut,
        MOVEMENT_TYPE.TRANSFER_POSTING,
        PRODUCTION_ORDER.BLANK,
      );

      if (materialDocument !== undefined) {
        dispatcher(setGoodsMovementLog([materialDocument]));
      } else {
      }
      return materialDocument;
    };

    if (storageLocationIn && storageLocationOut) {
      if (scannedLabels.length > 0) {
        return submitGoodsMovement();
      } else {
        Alert.alert('Άδειο παραστατικό');
      }
    } else {
      Alert.alert('Εισάγετε αποθηκευτικό χώρο');
    }
  };

  return (
    <View onTouchStart={focusBarcodeScanner}>
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
        scannedText={lastScannedBarcode}
        focused={true}
        onScan={addLabel}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{height: '45%'}}>
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              return (
                <LabelComponent
                  key={i}
                  count={scannedLabels[i].count}
                  barcode={
                    scannedLabels[i].materialNumber +
                    '-' +
                    scannedLabels[i].batch +
                    '-' +
                    scannedLabels[i].quantity
                  }
                  validity={false}
                  onDeletePressed={() => {
                    //TODO: implement delete label
                    console.log('a');
                  }}
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
            const goodsMovementLog = await submitGoodsMovement(scannedLabels);
            setIsLoading(false);

            if (goodsMovementLog) {
              navigation.navigate('TransferPostingLog', [
                goodsMovementLog,
                storageLocationIn,
                storageLocationOut,
              ]);
            }
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(TransferPosting);
