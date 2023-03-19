import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

import {GlobalStyles} from '../../../appearance/styles/GlobalStyles';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';

interface ManualLabelInputModalProps {
  visibility: boolean;
  onSubmit: (scannedBarcode: string) => void;
}

function ManualLabelInputModal(props: ManualLabelInputModalProps): JSX.Element {
  const {visibility, onSubmit} = props;

  const {theme} = useContext(ThemeContext);

  const [materialNumber, setMaterialNumber] =
    useState<string>('Κωδικός Υλικού');
  const [batch, setBatch] = useState<string>('Παρτίδα');
  const [quantity, setQuantity] = useState<string>('Ποσότητα');
  const [barcode, setBarcode] = useState<string>('');

  const barcodeIsValid = () => {
    const materialNumberRegex = new RegExp('^(1[0]|2[0-2]|30|4[0-2])[0-9]{7}$');
    const batchRegex = new RegExp(
      '^(0{2}[0-9]{8}|[0-9]{5}(X|F)[0-9]{4}|[0-9]{5}((BS(A|B|C|D)[0-9]{2})|(C(B|I|P|S|T|U|X|Y)[0-9]{3})|(M(B|C|P|U)[0-9]{3})|(XPD(B|C))[0-9]{1}|(DS|KS|EU|KC|KD)[0-9]{3}))',
      'i',
    );
    const quantityRegex = new RegExp('^[0-9]+[, | .]*[0-9]*');

    if (!materialNumberRegex.test(materialNumber)) {
      throw new Error('Λάθος κωδικός υλικού');
    }

    if (!batchRegex.test(batch)) {
      throw new Error('Λάθος παρτίδα');
    }

    if (!quantityRegex.test(quantity.toString())) {
      throw new Error('Λάθος ποσότητα');
    }

    setBarcode(materialNumber + '-' + batch + '-' + quantity);

    return true;
  };

  return (
    <Modal
      isVisible={visibility}
      onBackdropPress={() => {
        onSubmit('');
      }}>
      <View style={styles(theme).popupContainer}>
        <View style={styles(theme).popupHeaderContainer}>
          <Text style={styles(theme).popupHeaderText}>
            Χειροκίνητη Καταχώριση
          </Text>
        </View>

        <View style={styles(theme).popupBodyContainer}>
          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (materialNumber === 'Κωδικός Υλικού') {
                setMaterialNumber('');
              }
            }}
            onBlur={() => {
              if (materialNumber === '') {
                setMaterialNumber('Κωδικός Υλικού');
              }
            }}
            onChangeText={newText => setMaterialNumber(newText)}
            value={materialNumber}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (batch === 'Παρτίδα') {
                setBatch('');
              }
            }}
            onBlur={() => {
              if (batch === '') {
                setBatch('Παρτίδα');
              }
            }}
            onChangeText={newText => setBatch(newText)}
            value={batch}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (quantity === 'Ποσότητα') {
                setQuantity('');
              }
            }}
            onBlur={() => {
              if (quantity === '') {
                setQuantity('Ποσότητα');
              }
            }}
            onChangeText={newText => setQuantity(newText)}
            value={quantity}
          />
        </View>

        <View style={styles(theme).popupFooterContainer}>
          <Pressable
            style={styles(theme).popupSubmitBtn}
            onPress={() => {
              try {
                if (barcodeIsValid()) {
                  setMaterialNumber('Κωδικός Υλικού');
                  setBatch('Παρτίδα');
                  setQuantity('Ποσότητα');
                  onSubmit(materialNumber + '-' + batch + '-' + quantity);
                }
              } catch (error) {
                console.log('err');
                Alert.alert('Λάθος κατά την καταχώριση');
              }
              onSubmit('');
              Keyboard.dismiss();
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).popupSubmitBtnText}>Προσθήκη</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export const styles = (theme: any) =>
  StyleSheet.create({
    popupContainer: {
      borderRadius: 20,
      backgroundColor: theme.backgroundColor,
    },
    popupHeaderContainer: {
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
    },
    popupHeaderText: {
      color: theme.secondaryTextColor,
      fontSize: 24,
      fontWeight: 'bold',
    },
    popupBodyContainer: {},
    popupBodyText: {
      color: theme.secondaryTextColor,
    },
    popupFooterContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.buttonBackgroundColor,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    popupSubmitBtn: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popupSubmitBtnText: {
      color: theme.buttonTextColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default ManualLabelInputModal;
