import React, {useContext, useState, useRef, useEffect} from 'react';

import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  VirtualizedList,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import OutboundDelivery from '../components/OutboundDelivery.js';
import HandlingUnit from '../objects/HandlingUnit.js';
import SapRequestHandler from '../sap/SapRequestHandler.js';

import {styles} from '../styles/PickingStyles.js';
import {GlobalStyles} from '../styles/GlobalStyles.js';
import {ThemeContext} from '../styles/ThemeContext.js';

//TODO: Check if lock exists on outbound delivery number

export default Picking = ({navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  const invisibleInputRef = useRef();
  const outboundDeliveryRef = useRef();

  const [loading, setLoading] = useState(false);

  const [outboundDelivery, setOutboundDelivery] = useState();
  const [outboundDeliveryKey, setOutboundDeliveryKey] = useState(0);
  const [outboundDeliveryData, setOutboundDeliveryData] = useState();

  const [invisibleText, setInvisibleText] = useState();

  const [textInputArray, setTextInputArray] = useState([]);
  const [handlingUnitText, setHandlingUnitText] = useState();
  const [count, setCount] = useState(0);

  const validateOutboundDelivery = deliveryNr => {
    let outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(deliveryNr);
  };
  //FIXME: invisible input focus

  const focusInvisibleInput = e => {
    e.preventDefault();
    if (invisibleInputRef.current) {
      invisibleInputRef.current.focus();
    }
  };

  return (
    <View style={styles(theme).pickingContainer}>
      <Spinner
        visible={loading}
        textContent={'Picking...'}
        textStyle={{color: 'white'}}
      />

      <View style={styles(theme).outboundDeliveryInputContainer}>
        <Text style={styles(theme).outboundDeliveryInput}>
          Αριθμός Παράδοσης:
        </Text>
        <View onTouchStart={focusInvisibleInput}>
          <TextInput
            style={styles(theme).outboundDeliveryInputField}
            keyboardType="number-pad"
            onChangeText={outboundDelivery =>
              setOutboundDelivery(outboundDelivery)
            }
            onSubmitEditing={async () => {
              if (validateOutboundDelivery(outboundDelivery)) {
                let response = await SapRequestHandler.getOutboundDeliveryData(
                  outboundDelivery,
                );

                response.ITEMS.sort((a, b) => a.POSNR - b.POSNR);

                setOutboundDeliveryData(response);
                setOutboundDeliveryKey(outboundDeliveryKey + 1);
              } else {
                alert('Λάθος αριθμός παράδοσης');
              }

              if (invisibleInputRef.current) {
                invisibleInputRef.current.focus();
              }
            }}
            value={outboundDelivery}></TextInput>
        </View>
      </View>

      <View>
        {outboundDeliveryData !== undefined && outboundDeliveryData !== null ? (
          <OutboundDelivery
            key={outboundDeliveryKey}
            ref={outboundDeliveryRef}
            data={outboundDeliveryData}
          />
        ) : null}
      </View>

      <View
        style={styles(theme).invisibleInputContainer}
        onTouchStart={focusInvisibleInput}>
        {/* Main Body uses an invisible text input to pick a handling unit as soon as its scanned on this screen*/}
        <TextInput
          ref={invisibleInputRef}
          showSoftInputOnFocus={false}
          autoFocus={true}
          autoCorrect={false}
          autoComplete={'off'}
          caretHidden={true}
          style={{opacity: 0, height: 0}}
          value={invisibleText}
          onChangeText={async invisibleText => {
            let response;

            if (outboundDeliveryRef.current.header.pickingStatus === 'C') {
              alert('Το picking έχει ήδη ολοκληρωθεί');
            } else {
              try {
                setLoading(true);
                response = await SapRequestHandler.createPickingRequest(
                  invisibleText,
                  outboundDelivery,
                );
                setLoading(false);
              } catch (error) {
                console.log(error);
              }
            }
            {
              /* refresh outbound delivery contents */
            }
            if (response[0].CODE === 0) {
              console.log(response);

              if (validateOutboundDelivery(outboundDelivery)) {
                let response = await SapRequestHandler.getOutboundDeliveryData(
                  outboundDelivery,
                );

                response.ITEMS.sort((a, b) => a.POSNR - b.POSNR);

                setOutboundDeliveryData(response);
                setOutboundDeliveryKey(outboundDeliveryKey + 1);
              } else {
                alert('Λάθος αριθμός παράδοσης');
              }
            } else {
              console.log(response[0]);
              console.log('Picking failed');
            }
            {
              if (invisibleInputRef.current) {
                invisibleInputRef.current.focus();
              }
            }
            setInvisibleText('');
          }}
        />
      </View>
    </View>
  );
};
