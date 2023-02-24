import React, {useContext, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import BarcodeScanner from '../../components/BarcodeScanner';
import StorageLocationDropdown from './components/StorageLocationDropdown';
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

  const [lgortIn, setLgortIn] = useState();
  const [lgortOut, setLgortOut] = useState();

  const focusBarcodeScanner = (e: any) => {
    e.preventDefault();
    if (barcodeScannerRef.current) {
      barcodeScannerRef.current.focus();
    }
  };

  const addLabel = (lastScannedBarcode: string) => {
    console.log(lastScannedBarcode);
  };

  const addTest = () => {
    console.log('a');
  };

  const [t, setT] = useState<string>('');

  return (
    <View onTouchStart={focusBarcodeScanner}>
      <Spinner
        visible={isLoading}
        textContent={'Πραγματοποιείται ενδοδιακίνιση...'}
        textStyle={{color: 'white'}}
      />

      <BarcodeScanner scannedText={lastScannedBarcode} onScan={addLabel} />

      <StorageLocationDropdown placeholder={'Αποθηκευτικός χώρος προέλευσης'} />

      <Text>a</Text>
    </View>
  );
}

export default React.memo(TransferPosting);
