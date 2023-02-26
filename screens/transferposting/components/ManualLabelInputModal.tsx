import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';

import {GlobalStyles} from '../../../styles/GlobalStyles';
import {ThemeContext} from '../../../styles/ThemeContext';

interface ManualLabelInputModalProps {
  visibility: boolean;
  onSubmit: () => void;
}

function ManualLabelInputModal(props: ManualLabelInputModalProps): JSX.Element {
  const {visibility, onSubmit} = props;

  const {theme} = useContext(ThemeContext);

  const barcodeIsValid = () => {
    let matnrRegex = new RegExp('^(1[0]|2[0-2]|30|4[0-2])[0-9]{7}$');
    let chargRegex = new RegExp(
      '^(0{2}[0-9]{8}|[0-9]{5}(X|F)[0-9]{4}|[0-9]{5}((BS(A|B|C|D)[0-9]{2})|(C(B|I|P|S|T|U|X|Y)[0-9]{3})|(M(B|C|P|U)[0-9]{3})|(XPD(B|C))[0-9]{1}|(DS|KS|EU|KC|KD)[0-9]{3}))',
    );
    let mengeRegex = new RegExp('^[0-9]+');

    if (!matnrRegex.test(this.state.matnr)) {
      throw new Error('Λάθος κωδικός υλικού');
      return false;
    }

    if (!chargRegex.test(this.state.charg)) {
      throw new Error('Λάθος παρτίδα');
      return false;
    }

    if (!mengeRegex.test(this.state.menge)) {
      throw new Error('Λάθος ποσότητα');
      return false;
    }

    this.state.barcode =
      this.state.matnr + '-' + this.state.charg + '-' + this.state.menge;

    return true;
  };

  return (
    <Modal visible={visibility}>
      <View style={styles(theme).popupContainer}>
        <View title="Header" style={styles(theme).popupHeaderContainer}>
          <Text style={styles(theme).popupHeaderText}>
            Χειροκίνητη Καταχώριση
          </Text>
        </View>

        <View title="Body" style={styles(theme).popupBodyContainer}>
          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (this.state.matnr === 'Κωδικός Υλικού') {
                this.setState({matnr: ''});
              }
            }}
            onBlur={() => {
              if (this.state.matnr === '') {
                this.setState({matnr: 'Κωδικός Υλικού'});
              }
            }}
            onChangeText={newText => this.setState({matnr: newText})}
            value={this.state.matnr}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (this.state.charg === 'Παρτίδα') {
                this.setState({charg: ''});
              }
            }}
            onBlur={() => {
              if (this.state.charg === '') {
                this.setState({charg: 'Παρτίδα'});
              }
            }}
            onChangeText={newText => this.setState({charg: newText})}
            value={this.state.charg}
          />

          <TextInput
            style={styles(theme).popupBodyText}
            onFocus={() => {
              if (this.state.menge === 'Ποσότητα') {
                this.setState({menge: ''});
              }
            }}
            onBlur={() => {
              if (this.state.menge === '') {
                this.setState({menge: 'Ποσότητα'});
              }
            }}
            onChangeText={newText => this.setState({menge: newText})}
            value={this.state.menge}
          />
        </View>

        <View title="Footer" style={styles(theme).popupFooterContainer}>
          <Pressable
            style={styles(theme).popupSubmitBtn}
            onPress={() => {
              try {
                if (this.barcodeIsValid()) {
                  this.props.onSubmit();

                  this.setState({
                    matnr: 'Κωδικός Υλικού',
                    charg: 'Παρτίδα',
                    menge: 'Ποσότητα',
                  });
                }
              } catch (error) {
                alert(error);
              }

              this.setState({visibility: false});
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
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.backgroundColor,
    },
    popupHeaderContainer: {
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
    },
    popupHeaderText: {
      color: theme.secondaryTextColor,
      fontSize: 20,
    },
    popupBodyContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    popupBodyText: {
      color: theme.secondaryTextColor,
    },
    popupFooterContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      borderBottomLeftWidth: 1,
      borderBottomLeftColor: theme.borderColor,
      borderBottomLeftRadius: 20,
      borderBottomRightWidth: 1,
      borderBottomRightColor: theme.borderColor,
      borderBottomRightRadius: 20,
    },
    popupSubmitBtn: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popupSubmitBtnText: {
      color: theme.buttonTextColor,
      fontSize: 16,
    },
  });

export default ManualLabelInputModal;
