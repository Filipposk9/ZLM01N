import React, {useEffect} from 'react';
import {TextInput} from 'react-native';
import KeyEvent from 'react-native-keyevent';
import {KeyEventProps} from 'react-native-keyevent';

interface BarcodeScannerProps {
  reference: React.Ref<TextInput>;
  onScan: (scannedBarcode: string) => void;
  filter: (scannedBarcode: string) => void;
}

function BarcodeScanner(props: BarcodeScannerProps): JSX.Element {
  const {reference, onScan} = props;

  //TODO: add regex filter prop

  useEffect(() => {
    startListener();
  });

  const startListener = () => {
    KeyEvent.onKeyMultipleListener((keyEvent: KeyEventProps) => {
      console.log(`Barcode:  ${keyEvent.characters}`);
      onScan(keyEvent.characters);
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
