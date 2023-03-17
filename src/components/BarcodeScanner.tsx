import React, {useState} from 'react';
import {TextInput} from 'react-native';

interface BarcodeScannerProps {
  reference: React.Ref<TextInput>;
  onScan: (scannedBarcode: string) => void;
}

function BarcodeScanner(props: BarcodeScannerProps): JSX.Element {
  const {reference, onScan} = props;

  const [scannedText, setScannedText] = useState<string>();

  return (
    <TextInput
      ref={reference}
      showSoftInputOnFocus={false}
      autoFocus={true}
      autoCorrect={false}
      autoComplete={'off'}
      caretHidden={true}
      style={{height: 0, opacity: 0}}
      value={scannedText}
      onChangeText={scannedText => {
        setScannedText(scannedText);
        onScan(scannedText);
        setScannedText('');
      }}
      blurOnSubmit={false}
    />
  );
}

export default BarcodeScanner;
