import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import BarcodeValidator from '../validators/BarcodeValidator';

interface ManualLabelInputModalProps {
  headerText?: string;
  materialNumberText?: string;
  batchText?: string;
  quantityText?: string;
  buttonText?: string;
  editable?: boolean;
  visibility: boolean;
  onSubmit: (scannedBarcode: string) => void;
}

const defaultProps: ManualLabelInputModalProps = {
  headerText: 'Χειροκίνητη Καταχώριση',
  materialNumberText: 'Κωδικός Υλικού',
  batchText: 'Παρτίδα',
  quantityText: 'Ποσότητα',
  buttonText: 'Προσθήκη',
  editable: true,
  visibility: false,
  onSubmit: () => {},
};

function ManualLabelInputModal(props: ManualLabelInputModalProps): JSX.Element {
  const {
    headerText,
    materialNumberText,
    batchText,
    quantityText,
    buttonText,
    editable,
    visibility,
    onSubmit,
  } = props;

  const {theme} = useContext(ThemeContext);

  const [materialNumber, setMaterialNumber] = useState<string>(
    materialNumberText
      ? materialNumberText
      : defaultProps.materialNumberText
      ? defaultProps.materialNumberText
      : '',
  );
  const [batch, setBatch] = useState<string>(
    batchText
      ? batchText
      : defaultProps.batchText
      ? defaultProps.batchText
      : '',
  );
  const [quantity, setQuantity] = useState<string>(
    quantityText
      ? quantityText
      : defaultProps.quantityText
      ? defaultProps.quantityText
      : '',
  );

  return (
    <Modal
      isVisible={visibility}
      onBackdropPress={() => {
        onSubmit('');
      }}>
      <View style={styles(theme).popupContainer}>
        <View style={styles(theme).popupHeaderContainer}>
          <Text style={styles(theme).popupHeaderText}>
            {headerText ? headerText : defaultProps.headerText}
          </Text>
        </View>

        <View style={styles(theme).popupBodyContainer}>
          <TextInput
            style={styles(theme).popupBodyText}
            editable={
              editable === false
                ? editable
                : defaultProps.editable
                ? defaultProps.editable
                : true
            }
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
            value={editable === false ? materialNumberText : materialNumber}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            editable={
              editable === false
                ? editable
                : defaultProps.editable
                ? defaultProps.editable
                : true
            }
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
            value={editable === false ? batchText : batch}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            editable={
              editable === false
                ? editable
                : defaultProps.editable
                ? defaultProps.editable
                : true
            }
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
            value={editable === false ? quantityText : quantity}
          />
        </View>

        <View style={styles(theme).popupFooterContainer}>
          <Pressable
            style={styles(theme).popupSubmitBtn}
            onPress={() => {
              let barcode = '';

              console.log(editable);

              if (editable) {
                barcode = materialNumber + '-' + batch + '-' + quantity;
                console.log(materialNumber);
              } else {
                barcode =
                  materialNumberText + '-' + batchText + '-' + quantityText;
              }

              if (BarcodeValidator.validateBarrelLabel(barcode)) {
                setMaterialNumber('Κωδικός Υλικού');
                setBatch('Παρτίδα');
                setQuantity('Ποσότητα');

                onSubmit(barcode);
              }

              Keyboard.dismiss();
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).popupSubmitBtnText}>
              {buttonText
                ? buttonText
                : defaultProps.buttonText
                ? defaultProps.buttonText
                : ''}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = (theme: any) =>
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
      textAlign: 'center',
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
