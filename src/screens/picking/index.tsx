import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../styles/PickingStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {ThemeContext} from '../../styles/ThemeContext';
import BarcodeScanner from '../../components/BarcodeScanner';
import Repository from '../../data/Repository';
import {OutboundDelivery} from '../../shared/Types';

//TODO: props: pickingProps
function Picking({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [outboundDelivery, setOutboundDelivery] = useState<string>('');
  const [outboundDeliveryData, setOutboundDeliveryData] = useState<
    OutboundDelivery | undefined
  >();

  const validateOutboundDelivery = (deliveryNr: string) => {
    let outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(deliveryNr);
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
        <View>
          <TextInput
            style={styles(theme).outboundDeliveryInputField}
            keyboardType="number-pad"
            onChangeText={outboundDelivery =>
              setOutboundDelivery(outboundDelivery)
            }
            onSubmitEditing={async () => {
              if (validateOutboundDelivery(outboundDelivery)) {
                const response: OutboundDelivery | undefined =
                  await Repository.getOutboundDelivery(outboundDelivery);

                if (response !== undefined) {
                  response.items.sort(
                    (a, b) => a.positionNumber - b.positionNumber,
                  );
                }

                setOutboundDeliveryData(response);

                console.log(response.items[0]);

                //setOutboundDeliveryKey(outboundDeliveryKey + 1);
              } else {
                Alert.alert('Λάθος αριθμός παράδοσης');
              }
            }}
            value={outboundDelivery}></TextInput>
        </View>
      </View>

      {/* <View>
        {outboundDeliveryData !== undefined && outboundDeliveryData !== null ? (
          <OutboundDelivery
            key={outboundDeliveryKey}
            ref={outboundDeliveryRef}
            data={outboundDeliveryData}
          />
        ) : null}
      </View> */}

      <View style={styles(theme).invisibleInputContainer}>
        {/* Main Body uses an invisible text input to pick a handling unit as soon as its scanned on this screen*/}
        <BarcodeScanner
          onScan={async invisibleText => {
            let response;

            //   if (outboundDeliveryRef.current.header.pickingStatus === 'C') {
            //     alert('Το picking έχει ήδη ολοκληρωθεί');
            //   } else {
            //     try {
            //       setLoading(true);
            //       response = await SapRequestHandler.createPickingRequest(
            //         invisibleText,
            //         outboundDelivery,
            //       );
            //       setLoading(false);
            //     } catch (error) {
            //       console.log(error);
            //     }
            //   }
            //   {
            //     /* refresh outbound delivery contents */
            //   }
            //   if (response[0].CODE === 0) {
            //     console.log(response);

            //     if (validateOutboundDelivery(outboundDelivery)) {
            //       let response = await SapRequestHandler.getOutboundDeliveryData(
            //         outboundDelivery,
            //       );

            //       response.ITEMS.sort((a, b) => a.POSNR - b.POSNR);

            //       setOutboundDeliveryData(response);
            //       setOutboundDeliveryKey(outboundDeliveryKey + 1);
            //     } else {
            //       alert('Λάθος αριθμός παράδοσης');
            //     }
            //   } else {
            //     console.log(response[0]);
            //     console.log('Picking failed');
            //   }
            //   {
            //     if (invisibleInputRef.current) {
            //       invisibleInputRef.current.focus();
            //     }
            //   }
            //   setInvisibleText('');
            // }}
          }}
        />
      </View>
    </View>
  );
}

export default React.memo(Picking);
