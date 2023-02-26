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

function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const dispatcher = useAppDispatch();

  const {theme} = useContext(ThemeContext);

  //goodsMovementLog in redux
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
    setScannedLabels([
      ...scannedLabels,
      {
        count: scannedLabels.length + 1,
        materialNumber: lastScannedBarcode.split('-')[0],
        batch: lastScannedBarcode.split('-')[1],
        quantity: Number(lastScannedBarcode.split('-')[2]),
      },
    ]);
  };

  const submitMaterialDocument = (scannedLabels: Label[]) => {
    //TODO: add current user param

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
      }
    };

    if (storageLocationIn && storageLocationOut) {
      if (scannedLabels.length > 0) {
        submitGoodsMovement();

        navigation.navigate('TransferPostingLog');
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

      <BarcodeScanner scannedText={lastScannedBarcode} onScan={addLabel} />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              return (
                <LabelComponent
                  key={i}
                  count={scannedLabels.length}
                  barcode={
                    scannedLabels[i].materialNumber +
                    '-' +
                    scannedLabels[i].batch +
                    '-' +
                    scannedLabels[i].quantity
                  }
                  validity={false}
                  onDeletePressed={() => {
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
              navigation.navigate('TransferPostingHistory');
            }}
            style={styles(theme).historyButton}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).historyButtonText}>Ιστορικό</Text>
          </Pressable>
        </View>

        {/*Add Label Manually Button*/}
        <View style={styles(theme).addLabelBtnContainer}>
          <Pressable
            onPress={() => {
              console.log('a');
              //typedLabelInserterRef.current.setState({visibility: true});
            }}
            style={styles(theme).addLabelBtn}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).addLabelBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      {/*       <TypedLabelInserterPopup
        onSubmit={() => {
          addLabel(typedLabelInserterRef.current.state.barcode);
        }}
        ref={typedLabelInserterRef}
      /> */}

      {/* Submit form to SAP */}
      <View style={styles(theme).submitButtonContainer}>
        <Pressable
          style={styles(theme).submitButton}
          onPress={() => {
            submitMaterialDocument(scannedLabels);
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(TransferPosting);
