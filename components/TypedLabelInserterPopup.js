import React, {Component} from 'react';

import {View, Text, TextInput, Pressable} from 'react-native';
import Modal from 'react-native-modal';

import {styles} from '../styles/TransferPostingStyles.js';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ThemeContext} from '../styles/ThemeContext.js';

class TypedLabelInserterPopup extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      visibility: false,
      matnr: 'Κωδικός Υλικού',
      charg: 'Παρτίδα',
      menge: 'Ποσότητα',
      barcode: '',
    };
  }

  barcodeIsValid() {
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
  }

  render() {
    return (
      <Modal
        isVisible={this.state.visibility}
        onBackdropPress={() => this.setState({visibility: false})}>
        <View style={styles(this.context.theme).popupContainer}>
          <View
            title="Header"
            style={styles(this.context.theme).popupHeaderContainer}>
            <Text style={styles(this.context.theme).popupHeaderText}>
              Χειροκίνητη Καταχώριση
            </Text>
          </View>

          <View
            title="Body"
            style={styles(this.context.theme).popupBodyContainer}>
            <TextInput
              style={styles(this.context.theme).popupBodyText}
              onFocus={() => {
                if (this.state.matnr === 'Κωδικός Υλικού')
                  this.setState({matnr: ''});
              }}
              onBlur={() => {
                if (this.state.matnr === '')
                  this.setState({matnr: 'Κωδικός Υλικού'});
              }}
              onChangeText={newText => this.setState({matnr: newText})}
              value={this.state.matnr}></TextInput>

            <TextInput
              style={styles(this.context.theme).popupBodyText}
              onFocus={() => {
                if (this.state.charg === 'Παρτίδα') this.setState({charg: ''});
              }}
              onBlur={() => {
                if (this.state.charg === '') this.setState({charg: 'Παρτίδα'});
              }}
              onChangeText={newText => this.setState({charg: newText})}
              value={this.state.charg}></TextInput>

            <TextInput
              style={styles(this.context.theme).popupBodyText}
              onFocus={() => {
                if (this.state.menge === 'Ποσότητα') this.setState({menge: ''});
              }}
              onBlur={() => {
                if (this.state.menge === '') this.setState({menge: 'Ποσότητα'});
              }}
              onChangeText={newText => this.setState({menge: newText})}
              value={this.state.menge}></TextInput>
          </View>

          <View
            title="Footer"
            style={styles(this.context.theme).popupFooterContainer}>
            <Pressable
              style={styles(this.context.theme).popupSubmitBtn}
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
              android_ripple={GlobalStyles(this.context.theme).rippleColor}>
              <Text style={styles(this.context.theme).popupSubmitBtnText}>
                Προσθήκη
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }
}

export default TypedLabelInserterPopup;
