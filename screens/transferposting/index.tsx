import React, {useContext, useRef, useState} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
import Label from './components/Label';
import {useAppDispatch} from '../../redux/Store';
import {ThemeContext} from '../../styles/ThemeContext';

function TransferPosting({navigation}: {navigation: any}): JSX.Element {
  const dispatch = useAppDispatch();

  const {theme} = useContext(ThemeContext);

  //goodsMovementLog in redux
  //transferPostingQueue in redux-persist?

  const [isLoading, setIsLoading] = useState(false);

  const barcodeScannerRef = useRef();
  const [lastScannedBarcode, setLastScannedBarcode] = useState('');

  const [storageLocationIn, setStorageLocationIn] = useState('');
  const [storageLocationOut, setStorageLocationOut] = useState('');

  const [scannedLabels, setScannedLabels] = useState([
    {
      count: 1,
      matnr: '210000521',
      charg: '11111CU123',
      menge: '150',
      barcode: '210000521-11111CU123-150',
      validity: false,
      movetype: '311',
      aufnr: '',
    },
  ]);

  const focusBarcodeScanner = (e: any) => {
    e.preventDefault();
    /*if (barcodeScannerRef.current) {
      barcodeScannerRef.current.focus();
    }*/
  };

  const addLabel = (lastScannedBarcode: string) => {
    console.log(lastScannedBarcode);
  };

  const onStorageLocationInChange = (storageLocationIn: string) => {
    setStorageLocationIn(storageLocationIn);
  };

  const onStorageLocationOutChange = (storageLocationOut: string) => {
    setStorageLocationOut(storageLocationOut);
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
                <Label
                  key={i}
                  value={scannedLabels[i]}
                  barcode={scannedLabels[i].barcode}
                  counter={scannedLabels.length}
                  lgortIn={storageLocationIn}
                  lgortOut={storageLocationOut}
                  validity={scannedLabels[i].validity}
                  onDeletePressed={() => {
                    console.log('a');
                  }}
                />
              );
            })
          : null}
      </ScrollView>

      <Pressable
        onPress={() => {
          console.log(scannedLabels);
        }}>
        <Text>a</Text>
      </Pressable>
    </View>
  );
}

export default React.memo(TransferPosting);
