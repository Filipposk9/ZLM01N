import React, {useContext, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from '../../appearance/assets/Icon';
import {styles} from '../../appearance/styles/TankCharacteristicsStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {TextInput} from 'react-native-gesture-handler';
import {iTankCharacteristics} from '../../shared/Types';
import SapStructureValidator from '../../utilities/validators/SapStructureValidator';
import Repository from '../../data/Repository';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';

function TankCharacteristics({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [tank, setTank] = useState<string>('');
  const [tankCharacteristicsData, setTankCharacteristicsData] =
    useState<iTankCharacteristics>();

  const scrollViewRef = useRef<ScrollView>(null);

  const getTankCharacteristics = () => {
    const getTankCharacteristics = async () => {
      if (SapStructureValidator.validateTank(tank)) {
        const response = await Repository.getTankCharacteristics(
          tank.toUpperCase(),
        );

        if (response !== undefined) {
          setTankCharacteristicsData(response);
        }
      } else {
        Alert.alert('Λάθος όνομα δεξαμενής');
      }
    };

    getTankCharacteristics();
  };

  return (
    <View style={styles(theme).tankCharacteristicsContainer}>
      <View style={styles(theme).topContainer}>
        <View style={styles(theme).tankInfoHeader}>
          <Text style={styles(theme).tankInfoHeaderText}>
            {tankCharacteristicsData?.materialText}
          </Text>
        </View>
        <View style={styles(theme).headerContainer}>
          <View style={styles(theme).tankInfoContainer}>
            <Text style={styles(theme).tankInfoText}>
              Παρτίδα: {tankCharacteristicsData?.batch}
            </Text>
            <Text style={styles(theme).tankInfoText}>
              Ποσότητα: {tankCharacteristicsData?.quantity} KG
            </Text>

            <Text style={styles(theme).tankInfoText}>
              Ποιότητα: {tankCharacteristicsData?.quality}
            </Text>

            <Text style={styles(theme).tankInfoText}>
              Σοδειά: {tankCharacteristicsData?.crop}
            </Text>
          </View>

          <View style={styles(theme).tankIconContainer}>
            <Icon
              name={'propane-tank'}
              color={'white'}
              size={Dimensions.get('window').width / 2.5}></Icon>
            <TextInput
              style={styles(theme).textInsideIcon}
              autoCapitalize="characters"
              onChangeText={tank => {
                setTank(tank);
              }}
              value={tank}
              onSubmitEditing={() => {
                getTankCharacteristics();
              }}></TextInput>
          </View>
        </View>
      </View>

      <ScrollView style={styles(theme).characteristicsContainer}>
        {[
          {
            label: 'Ποιότητα Χρώματος',
            value: tankCharacteristicsData?.colorQuality,
          },
          {label: 'Σκληρότητα', value: tankCharacteristicsData?.hardness},
          {label: 'pH', value: tankCharacteristicsData?.pH},
          {label: 'Αλάτι', value: tankCharacteristicsData?.salt},
          {
            label: 'Τεμαχισμός',
            value: tankCharacteristicsData?.unitsPerKg,
            disabled: true,
          },
          {
            label: 'Δάκος',
            value: tankCharacteristicsData?.oliveFly,
            disabled: true,
          },
          {
            label: 'Γλοιοσπόριο',
            value: tankCharacteristicsData?.gliospore,
            disabled: true,
          },
          {
            label: 'Ανάλυση',
            value: tankCharacteristicsData?.analysis,
            disabled: true,
          },
          {
            label: 'Κόκκινα',
            value: tankCharacteristicsData?.redness,
            disabled: true,
          },
        ].map((characteristic, index) => (
          <Pressable
            key={characteristic.label}
            style={styles(theme).characteristicLine}
            onPress={() => scrollToElement(index)}>
            <TextInput
              editable={false}
              autoCorrect={false}
              style={styles(theme).characteristicText}>
              {characteristic.label}
            </TextInput>
            <View style={styles(theme).characteristicInputContainer}>
              <TextInput
                keyboardType="numeric"
                style={styles(theme).characteristicInput}
                editable={!characteristic.disabled}>
                {characteristic.value}
              </TextInput>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles(theme).bottomContainer}>
        <View style={styles(theme).submitButtonContainer}>
          <Pressable
            style={styles(theme).submitButton}
            onPress={async () => {
              // setIsLoading(true);
              // const goodsMovementLog = await submitGoodsMovement(
              //   scannedLabels,
              //   storageLocationIn,
              //   storageLocationOut,
              // );
              // setIsLoading(false);
              // if (goodsMovementLog) {
              //   dispatch(setGoodsMovementLog(goodsMovementLog));
              //   navigation.navigate('TransferPostingLog', [
              //     goodsMovementLog,
              //     storageLocationIn,
              //     storageLocationOut,
              //   ]);
              // } else {
              //   if (
              //     scannedLabels.length > 0 &&
              //     storageLocationsAreValid(
              //       storageLocationIn,
              //       storageLocationOut,
              //     )
              //   ) {
              //     resetScreenComponents();
              //     Alert.alert(
              //       'Ανεπαρκές Σήμα',
              //       'Το παραστατικό προστέθηκε στην ουρά',
              //     );
              //   }
              // }
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default React.memo(TankCharacteristics);
