import React, {useContext, useState, useRef} from 'react';
import {View, Text, TextInput, Alert, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {styles} from '../../appearance/styles/PickingStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import Repository from '../../data/Repository';
import {OutboundDelivery} from '../../shared/Types';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';
import SapStructureValidator from '../../utilities/validators/SapStructureValidator';
import OutboundDeliveryItemComponent from './components/OutboundDeliveryItemComponent';
import {useFocusEffect} from '@react-navigation/native';

function Picking({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [outboundDelivery, setOutboundDelivery] = useState<string>('');
  const [outboundDeliveryData, setOutboundDeliveryData] = useState<
    OutboundDelivery | undefined
  >();

  const scannerRef = useRef<TextInput>(null);
  const itemListRef = useRef<FlatList>(null);

  const getOutboundDeliveryData = () => {
    const getOutboundDeliveryData = async () => {
      if (SapStructureValidator.validateOutboundDelivery(outboundDelivery)) {
        const response = await Repository.getOutboundDelivery(outboundDelivery);

        if (response !== undefined) {
          response.items.sort((a, b) => a.positionNumber - b.positionNumber);

          setOutboundDeliveryData(response);
        }
      } else {
        Alert.alert('Λάθος αριθμός παράδοσης');
      }
    };

    getOutboundDeliveryData();
    scannerRef.current?.focus();
  };

  const pickLabel = (lastScannedBarcode: string) => {
    const pickLabel = async (lastScannedBarcode: string) => {
      if (lastScannedBarcode !== '') {
        if (outboundDeliveryData?.header.status === 'C') {
          Alert.alert('To picking έχει ήδη ολοκληρωθεί');
        } else {
          setLoading(true);

          if (lastScannedBarcode.includes('-')) {
            lastScannedBarcode = lastScannedBarcode.replace(',', '.');
          }

          const response = await Repository.createPickingRequest(
            outboundDelivery,
            lastScannedBarcode,
          );
          if (response !== undefined) {
            if (response.code === 0) {
              getOutboundDeliveryData();

              const scannedIndex = outboundDeliveryData?.items.findIndex(
                item => item.positionNumber === response.positionNumberHandled,
              );

              if (scannedIndex) {
                itemListRef.current?.scrollToIndex({
                  index: scannedIndex,
                  animated: true,
                });
              }
            } else {
              Alert.alert(response.message);
            }
          }
          setLoading(false);
        }
      }
      scannerRef.current?.focus();
    };
    pickLabel(lastScannedBarcode);
  };

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
              if (outboundDelivery.substring(0, 1) !== '8') {
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
          ref={itemListRef}
          data={outboundDeliveryData?.items}
          renderItem={({item}) => (
            <OutboundDeliveryItemComponent
              item={item}></OutboundDeliveryItemComponent>
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
          validator={lastScannedBarcode =>
            BarcodeValidator.validatePalletLabel(lastScannedBarcode) ||
            BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
          }
        />
      </View>
    </View>
  );
}

export default React.memo(Picking);
