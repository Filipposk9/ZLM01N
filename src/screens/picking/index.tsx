import React, {useContext, useState, useRef} from 'react';
import {View, Text, TextInput, Pressable, Alert, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../appearance/styles/PickingStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
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

  const scannerRef = useRef<TextInput>(null);

  const validateOutboundDelivery = (outboundDeliveryNumber: string) => {
    let outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(outboundDeliveryNumber);
  };

  const onChangeLayout = (index: number) => {
    const nextState: boolean[] = expanded.map((c, i) => {
      if (i === index) {
        if (c) {
          return false;
        } else {
          return true;
        }
      } else {
        return null as unknown as boolean;
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

        if (scannerRef.current) {
          scannerRef.current.focus();
        }
      }
    };

    getOutboundDeliveryData();
  };

  const pickLabel = (lastScannedBarcode: string) => {
    const pickLabel = async (lastScannedBarcode: string) => {
      if (lastScannedBarcode !== '') {
        if (outboundDeliveryData?.header.status === 'C') {
          Alert.alert('To picking έχει ήδη ολοκληρωθεί');
          if (scannerRef.current) {
            scannerRef.current.focus();
          }
        } else {
          setLoading(true);
          const response = await Repository.createPickingRequest(
            outboundDelivery,
            lastScannedBarcode,
          );
          if (response !== undefined) {
            if (response.code === 0) {
              getOutboundDeliveryData();
            } else {
              Alert.alert(response.message);
              if (scannerRef.current) {
                scannerRef.current.focus();
              }
            }
          }
          setLoading(false);
        }
      }
    };
    pickLabel(lastScannedBarcode);
  };

  const palletLabelFilter = (lastScannedBarcode: string) => {
    //
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
        <Text style={styles(theme).outboundDeliveryInput}>Παράδοση: </Text>
        <View>
          <TextInput
            style={styles(theme).outboundDeliveryInputField}
            keyboardType="number-pad"
            onChangeText={outboundDelivery => {
              if (outboundDelivery.substring(0, 1) === '0') {
              } else {
                setOutboundDelivery(outboundDelivery);
              }
            }}
            onSubmitEditing={() => {
              getOutboundDeliveryData();
            }}
            value={outboundDelivery}></TextInput>
        </View>
      </View>

      <View style={styles(theme).topContainer}>
        <View style={styles(theme).outboundDeliveryHeaderContainer}>
          <View style={styles(theme).outboundDeliveryHeaderItem}>
            <Text style={styles(theme).outboundDeliveryHeaderTextLeft}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Πελάτης</Text>
              {'                 '}
              {outboundDeliveryData?.header.customerName}
            </Text>
          </View>
          <View style={styles(theme).outboundDeliveryHeaderItem}>
            <Text style={styles(theme).outboundDeliveryHeaderTextRight}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Προορισμός</Text>
              {'                 '}
              {outboundDeliveryData?.header.shipToPartyName}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles(theme).outboundDeliveryStatusText,
            {
              color:
                outboundDeliveryData?.header.status === 'C'
                  ? '#C17161'
                  : '#94BA78',
            },
          ]}>
          Picking Status: {outboundDeliveryData?.header.status}
        </Text>
      </View>

      <View style={styles(theme).outboundDeliveryLinesContainer}>
        <FlatList
          data={outboundDeliveryData?.items}
          renderItem={({item, index}) => (
            <View style={styles(theme).outboundDeliveryLine}>
              <Pressable
                style={styles(theme).outboundDeliveryItem}
                onPress={() => onChangeLayout(index)}>
                <View style={styles(theme).outboundDeliveryLineLeft}>
                  <Text style={styles(theme).outboundDeliveryLineTextLeft}>
                    {item.positionNumber}
                  </Text>
                </View>
                <View style={styles(theme).outboundDeliveryLineRight}>
                  <Text style={styles(theme).outboundDeliveryLineTextRight}>
                    <Text>
                      {item.materialText}
                      {'\n'}
                    </Text>
                    <Text>
                      Picked: {item.pickedQuantity}/{item.requirementQuantity}{' '}
                      {item.unitOfMeasure}
                      {'\n'}
                    </Text>
                    <Text>Scanned: {item.handlingUnits.length} PAL</Text>
                  </Text>
                </View>
              </Pressable>
              <View
                style={{
                  height: expanded[index] ? undefined : 0,
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

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            if (outboundDelivery !== '') {
              pickLabel(lastScannedBarcode);
            }
          }}
          filter={lastScannedBarcode => {
            //TODO: group filter functions
            palletLabelFilter(lastScannedBarcode);
          }}
        />
      </View>
    </View>
  );
}

export default React.memo(Picking);
