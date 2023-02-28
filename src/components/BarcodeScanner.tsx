import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';

interface BarcodeScannerProps {
  onScan: (scannedBarcode: string) => void;
}

function BarcodeScanner(props: BarcodeScannerProps): JSX.Element {
  const {onScan} = props;

  const inputRef = useRef<TextInput>(null);

  const [scannedText, setScannedText] = useState<string>();

  useEffect(() => {
    const onFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const onBlur = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Set focus on the input when the component mounts and after every re-render
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Add event listeners to set focus on the input when it loses focus
    inputRef.current?.setNativeProps({
      onFocus,
      onBlur,
    });

    // Remove event listeners when the component unmounts
    return () => {
      inputRef.current?.setNativeProps({
        onFocus: null,
        onBlur: null,
      });
    };
  }, []);

  return (
    <TextInput
      ref={inputRef}
      showSoftInputOnFocus={false}
      autoFocus={true}
      autoCorrect={false}
      autoComplete={'off'}
      caretHidden={true}
      style={{opacity: 0, height: 0}}
      value={scannedText}
      onChangeText={scannedText => {
        setScannedText(scannedText);
        onScan(scannedText);
        setScannedText('');
      }}
    />
  );
}

export default BarcodeScanner;
