import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {styles} from '../../appearance/styles/BarrelCharacteristicsStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';
import Repository from '../../data/Repository';
import {BatchCharacteristics} from '../../shared/Types';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import Slider from '@react-native-community/slider';

function BarrelCharacteristics({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [batchCharacteristics, setBatchCharacteristics] =
    useState<BatchCharacteristics>();

  const scannerRef = useRef<TextInput>(null);

  const getBatchCharacteristics = (lastScannedBarcode: string) => {
    const getBatchCharacteristics = async (lastScannedBarcode: string) => {
      const [materialNumber, batch] = lastScannedBarcode.split('-');

      const response = await Repository.getBatchCharacteristics(
        materialNumber,
        batch,
      );

      if (response !== undefined) {
        setBatchCharacteristics(response);
      }
    };
    getBatchCharacteristics(lastScannedBarcode);
  };

  const submitBatchCharacteristics = async (
    batchCharacteristics: BatchCharacteristics,
  ) => {
    const response = await Repository.changeBatchCharacteristics(
      batchCharacteristics,
    );

    if (response !== undefined) {
      setBatchCharacteristics(response);
      Alert.alert('Επιτυχής καταχώριση');
    } else {
      Alert.alert('Σφάλμα');
    }
  };

  return (
    <View style={styles(theme).barrelCharacteristicsContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Καταχώριση Χαρακτηριστικών...'}
        textStyle={{color: 'white'}}></Spinner>

      <View style={styles(theme).topContainer}>
        <Text style={styles(theme).headerText}>
          Υλικό: {batchCharacteristics?.materialNumber}
        </Text>
        <Text style={styles(theme).headerText}>
          {batchCharacteristics?.materialText}
        </Text>
        <Text style={styles(theme).headerText}>
          Παρτίδα: {batchCharacteristics?.batch}
        </Text>
      </View>

      <View style={styles(theme).basicCharacteristicsBox}>
        <Text style={styles(theme).basicCharacteristicsText}>
          Ποιότητα Χρώματος
        </Text>

        <View style={styles(theme).basicCharacteristicsContainer}>
          <View style={styles(theme).basicCharacteristicsSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              value={
                batchCharacteristics &&
                batchCharacteristics.colorQuality !== '?'
                  ? Number(batchCharacteristics?.colorQuality)
                  : 0
              }
              onValueChange={val => {
                if (batchCharacteristics !== undefined) {
                  const newCharacteristicsData = {
                    ...batchCharacteristics,
                    ['colorQuality']: val.toString(),
                  };

                  setBatchCharacteristics(newCharacteristicsData);
                }
              }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
          </View>

          <View style={styles(theme).basicCharacteristicsTextContainer}>
            <Text style={styles(theme).basicCharacteristicsValue}>
              {batchCharacteristics?.colorQuality !== '?'
                ? batchCharacteristics?.colorQuality
                : 0}
            </Text>
          </View>
        </View>

        <Text style={styles(theme).basicCharacteristicsText}>Σκληρότητα</Text>

        <View style={styles(theme).basicCharacteristicsContainer}>
          <View style={styles(theme).basicCharacteristicsSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              value={
                batchCharacteristics && batchCharacteristics.hardness !== '?'
                  ? Number(batchCharacteristics?.hardness)
                  : 0
              }
              onValueChange={val => {
                if (batchCharacteristics !== undefined) {
                  const newCharacteristicsData = {
                    ...batchCharacteristics,
                    ['hardness']: val.toString(),
                  };

                  setBatchCharacteristics(newCharacteristicsData);
                }
              }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
          </View>

          <View style={styles(theme).basicCharacteristicsTextContainer}>
            <Text style={styles(theme).basicCharacteristicsValue}>
              {batchCharacteristics?.hardness !== '?'
                ? batchCharacteristics?.hardness
                : 0}
            </Text>
          </View>
        </View>

        <Text style={styles(theme).basicCharacteristicsText}>Αλάτι</Text>

        <View style={styles(theme).basicCharacteristicsContainer}>
          <View style={styles(theme).basicCharacteristicsSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              value={
                batchCharacteristics && batchCharacteristics.salt !== '?'
                  ? Number(
                      batchCharacteristics?.salt
                        .replace('%', '')
                        .replace(',', '.'),
                    )
                  : 0
              }
              onValueChange={val => {
                if (batchCharacteristics !== undefined) {
                  const newCharacteristicsData = {
                    ...batchCharacteristics,
                    ['salt']: val.toString(),
                  };

                  setBatchCharacteristics(newCharacteristicsData);
                }
              }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
          </View>

          <View style={styles(theme).basicCharacteristicsTextContainer}>
            <Text style={styles(theme).basicCharacteristicsValue}>
              {batchCharacteristics?.salt !== '?'
                ? batchCharacteristics?.salt
                : 0}
            </Text>
          </View>
        </View>

        <Text style={styles(theme).basicCharacteristicsText}>pH</Text>

        <View style={styles(theme).basicCharacteristicsContainer}>
          <View style={styles(theme).basicCharacteristicsSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              value={
                batchCharacteristics && batchCharacteristics.pH !== '?'
                  ? Number(batchCharacteristics?.pH.replace(',', '.'))
                  : 0
              }
              onValueChange={val => {
                if (batchCharacteristics !== undefined) {
                  const newCharacteristicsData = {
                    ...batchCharacteristics,
                    ['pH']: val.toFixed(2).toString(),
                  };

                  setBatchCharacteristics(newCharacteristicsData);
                }
              }}
              minimumValue={2}
              maximumValue={5}
              step={0.01}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
          </View>

          <View style={styles(theme).basicCharacteristicsTextContainer}>
            <Text style={styles(theme).basicCharacteristicsValue}>
              {batchCharacteristics?.pH !== '?' ? batchCharacteristics?.pH : 0}
            </Text>
          </View>
        </View>

        <Text style={styles(theme).basicCharacteristicsText}>Ελαττώματα</Text>

        <View style={styles(theme).basicCharacteristicsContainer}>
          <View style={styles(theme).basicCharacteristicsSlider}>
            <Slider
              style={{width: '100%', height: 30}}
              value={
                batchCharacteristics && batchCharacteristics.defects !== '?'
                  ? Number(batchCharacteristics?.defects.replace('%', ''))
                  : 0
              }
              onValueChange={val => {
                if (batchCharacteristics !== undefined) {
                  const newCharacteristicsData = {
                    ...batchCharacteristics,
                    ['defects']: val.toString(),
                  };

                  setBatchCharacteristics(newCharacteristicsData);
                }
              }}
              minimumValue={0}
              maximumValue={99}
              step={2.5}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
          </View>

          <View style={styles(theme).basicCharacteristicsTextContainer}>
            <Text style={styles(theme).basicCharacteristicsValue}>
              {batchCharacteristics?.defects !== '?'
                ? batchCharacteristics?.defects
                : 0}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles(theme).bottomContainer}>
        <View style={styles(theme).submitButtonContainer}>
          <Pressable
            style={styles(theme).submitButton}
            onPress={async () => {
              setIsLoading(true);

              if (batchCharacteristics !== undefined) {
                const response = await submitBatchCharacteristics(
                  batchCharacteristics,
                );

                setIsLoading(false);

                if (response !== undefined) {
                  Alert.alert('Επιτυχής Καταχώριση');
                }
              } else {
                Alert.alert('Εισάγετε παρτίδα');
              }
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
          </Pressable>
        </View>
      </View>

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            getBatchCharacteristics(lastScannedBarcode);
          }}
          validator={lastScannedBarcode =>
            BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
          }></BarcodeScanner>
      </View>
    </View>
  );
}

export default React.memo(BarrelCharacteristics);
