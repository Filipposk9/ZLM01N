import React from 'react';
import {TextInput} from 'react-native';

interface BarcodeScannerProps {
  //ref: React.Ref<any>;
  scannedText: string;
  onScan: (scannedBarcode: string) => void;
}

function BarcodeScanner(props: BarcodeScannerProps): JSX.Element {
  const {scannedText, onScan} = props;

  return (
    <TextInput
      showSoftInputOnFocus={false}
      autoFocus={true}
      autoCorrect={false}
      autoComplete={'off'}
      caretHidden={true}
      style={{opacity: 0, height: 0}}
      value={scannedText}
      onChangeText={onScan}
    />
  );
}

export default BarcodeScanner;
