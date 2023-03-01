import React, {useContext, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../styles/PickingStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {ThemeContext} from '../../styles/ThemeContext';
import BarcodeScanner from '../../components/BarcodeScanner';
import Repository from '../../data/Repository';
import {OutboundDelivery} from '../../shared/Types';

function Picking({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [outboundDelivery, setOutboundDelivery] = useState<string>('');
  const [outboundDeliveryData, setOutboundDeliveryData] = useState<
    OutboundDelivery | undefined
  >();

  const validateOutboundDelivery = (outboundDeliveryNumber: string) => {
    let outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(outboundDeliveryNumber);
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
                const response = await Repository.getOutboundDelivery(
                  outboundDelivery,
                );

                if (response !== undefined) {
                  response.items.sort(
                    (a, b) => a.positionNumber - b.positionNumber,
                  );

                  setOutboundDeliveryData(response);
                }
              } else {
                Alert.alert('Λάθος αριθμός παράδοσης');
              }
            }}
            value={outboundDelivery}></TextInput>
        </View>
      </View>

      <BarcodeScanner
        onScan={async invisibleText => {
          let response;

          //   if (outboundDeliveryRef.current.outboundDeliveryData?.header.pickingStatus === 'C') {
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

      <View style={styles(theme).outboundDeliveryContainer}>
        <Text style={styles(theme).outboundDeliveryHeaderText}>
          Πελάτης: {outboundDeliveryData?.header.customerName}
        </Text>
        <Text style={styles(theme).outboundDeliveryHeaderText}>
          Προορισμός: {outboundDeliveryData?.header.shipToPartyName}
        </Text>
        <Text
          style={[
            styles(theme).outboundDeliveryHeaderText,
            outboundDeliveryData?.header.status === 'C'
              ? {color: 'red'}
              : {color: theme.buttonTextColor},
          ]}>
          Picking Status: {outboundDeliveryData?.header.status}
        </Text>

        <View style={styles(theme).outboundDeliveryLinesContainer}>
          <FlatList
            data={outboundDeliveryData?.items}
            renderItem={({item, index}) => (
              <View>
                {/* <Pressable onPress={onChangeLayout.bind(this, index)}> */}
                <Text style={styles(theme).outboundDeliveryLinesText}>
                  {item.positionNumber}. {item.materialText}
                </Text>
                <Text style={styles(theme).outboundDeliveryLinesText}>
                  Picked: {item.pickedQuantity}/{item.requirementQuantity}
                  {item.unitOfMeasure}
                </Text>
                <Text style={styles(theme).outboundDeliveryLinesText}>
                  Scanned: {0} PAL
                </Text>
                {/* </Pressable> */}
                <View
                // style={{
                //   height: state.expanded[index] ? null : 0,
                //   overflow: 'hidden',
                // }}
                >
                  <FlatList
                    data={item.handlingUnits}
                    renderItem={({item}) => (
                      <View
                        style={
                          styles(theme).outboundDeliveryHandlingUnitsContainer
                        }>
                        <Text
                          style={
                            styles(theme).outboundDeliveryHandlingUnitsText
                          }>
                          SSCC: {item.sscc}
                        </Text>
                        <Text
                          style={
                            styles(theme).outboundDeliveryHandlingUnitsText
                          }>
                          Παρτίδα: {item.batch}
                        </Text>
                        <Text
                          style={
                            styles(theme).outboundDeliveryHandlingUnitsText
                          }>
                          Ποσότητα: {item.quantity} {item.unitOfMeasure}
                        </Text>
                        <Text
                          style={
                            styles(theme).outboundDeliveryHandlingUnitsText
                          }>
                          Αποθ. Χώρος: {item.storageLocation}
                        </Text>
                      </View>
                    )}></FlatList>
                </View>
              </View>
            )}></FlatList>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Picking);
