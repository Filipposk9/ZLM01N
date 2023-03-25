import React, {useEffect} from 'react';
import {Alert, TextInput} from 'react-native';
import KeyEvent from 'react-native-keyevent';
import {KeyEventProps} from 'react-native-keyevent';

interface BarcodeScannerProps {
  reference: React.Ref<TextInput>;
  onScan: (scannedBarcode: string) => void;
  validator: (scannedBarcode: string) => boolean;
}

function BarcodeScanner(props: BarcodeScannerProps): JSX.Element {
  const {reference, onScan, validator} = props;

  useEffect(() => {
    startListener();
  });

  const startListener = () => {
    KeyEvent.onKeyMultipleListener((keyEvent: KeyEventProps) => {
      console.log(`Barcode:  ${keyEvent.characters}`);
      if (validator(keyEvent.characters)) {
        onScan(keyEvent.characters);
      } else {
        Alert.alert('Invalid Barcode Format');
      }
    });
  };

  return (
    <TextInput
      ref={reference}
      showSoftInputOnFocus={false}
      autoFocus={true}
      autoCorrect={false}
      autoComplete={'off'}
      caretHidden={false}
      blurOnSubmit={false}
    />
  );
}

export default BarcodeScanner;
