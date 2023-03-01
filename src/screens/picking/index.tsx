import React, {useContext, useState, useRef} from 'react';
import {View, Text, TextInput, Pressable, Alert, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../styles/PickingStyles';
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
  const [expanded, setExpanded] = useState<boolean[]>([]);

  const inputRef = useRef<TextInput>(null);

  const validateOutboundDelivery = (outboundDeliveryNumber: string) => {
    let outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(outboundDeliveryNumber);
  };

  const onChangeLayout = (index: number) => {
    const nextState = expanded.map((c, i) => {
      if (i === index) {
        if (c) {
          return false;
        } else {
          return true;
        }
      }
    });

    if (nextState !== undefined) {
      setExpanded(nextState);
    }
  };

  const getOutboundDeliveryData = () => {
    const getOutboundDeliveryData = async () => {
      if (validateOutboundDelivery(outboundDelivery)) {
        const response = await Repository.getOutboundDelivery(outboundDelivery);

        if (response !== undefined) {
          response.items.sort((a, b) => a.positionNumber - b.positionNumber);

          setOutboundDeliveryData(response);

          const initialState = new Array(response.items.length).fill(false);

          setExpanded(initialState);
        }
      } else {
        Alert.alert('Λάθος αριθμός παράδοσης');

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    getOutboundDeliveryData();
  };

  const pickLabel = (lastScannedBarcode: string) => {
    console.log(lastScannedBarcode);

    const pickLabel = async () => {
      if (lastScannedBarcode !== '') {
        if (outboundDeliveryData?.header.status === 'C') {
          Alert.alert('To picking έχει ήδη ολοκληρωθεί');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        } else {
          setLoading(true);

          const response = await Repository.createPickingRequest(
            outboundDelivery,
            lastScannedBarcode,
          );

          if (response !== undefined) {
            if (response.code === 0) {
              if (validateOutboundDelivery(outboundDelivery)) {
                const refreshedOutboundDelivery =
                  await Repository.getOutboundDelivery(outboundDelivery);
                if (refreshedOutboundDelivery !== undefined) {
                  refreshedOutboundDelivery.items.sort(
                    (a, b) => a.positionNumber - b.positionNumber,
                  );
                  setOutboundDeliveryData(refreshedOutboundDelivery);
                  const initialState = new Array(
                    refreshedOutboundDelivery.items.length,
                  ).fill(false);
                  setExpanded(initialState);
                }
              }
            } else {
              Alert.alert(response.message);

              if (inputRef.current) {
                inputRef.current.focus();
              }
            }
          }

          setLoading(false);
        }
      }
    };

    pickLabel();
  };

  //TODO: animate flatlist spawning

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
            onChangeText={outboundDelivery => {
              setOutboundDelivery(outboundDelivery);
            }}
            onSubmitEditing={() => {
              getOutboundDeliveryData();

              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            value={outboundDelivery}></TextInput>
        </View>
      </View>

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
                <Pressable onPress={() => onChangeLayout(index)}>
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
                </Pressable>
                <View
                  style={{
                    height: expanded[index] ? null : 0,
                    overflow: 'hidden',
                  }}>
                  <FlatList
                    data={item.handlingUnits}
                    renderItem={({item}) => {
                      //TODO: make into 1 component
                      return (
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
                      );
                    }}></FlatList>
                </View>
              </View>
            )}></FlatList>
        </View>
      </View>

      <BarcodeScanner
        reference={inputRef}
        onScan={lastScannedBarcode => pickLabel(lastScannedBarcode)}
      />
    </View>
  );
}

export default React.memo(Picking);
