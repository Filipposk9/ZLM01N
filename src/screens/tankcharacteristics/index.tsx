import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const submitTankCharacteristics = async (
    tankCharacteristics: iTankCharacteristics,
  ) => {
    const response = await Repository.changeTankCharacteristics(
      tankCharacteristics,
    );

    if (response !== undefined) {
      getTankCharacteristics();
      Alert.alert('Επιτυχής καταχώριση');
    } else {
      Alert.alert('Σφάλμα');
    }
  };

  return (
    <View style={styles(theme).tankCharacteristicsContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Καταχώριση χαρακτηριστικών...'}
        textStyle={{color: 'white'}}></Spinner>
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

          <View>
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
          {title: 'pH', label: 'pH', value: tankCharacteristicsData?.pH},
          {title: 'salt', label: 'Αλάτι', value: tankCharacteristicsData?.salt},
          {
            title: 'colorQuality',
            label: 'Ποιότητα Χρώματος',
            value: tankCharacteristicsData?.colorQuality,
          },
          {
            title: 'hardness',
            label: 'Σκληρότητα',
            value: tankCharacteristicsData?.hardness,
          },

          {
            title: 'unitsPerKg',
            label: 'Τεμαχισμός',
            value: tankCharacteristicsData?.unitsPerKg,
            disabled: true,
          },
          {
            title: 'oliveFly',
            label: 'Δάκος',
            value: tankCharacteristicsData?.oliveFly,
            disabled: true,
          },
          {
            title: 'gliospore',
            label: 'Γλοιοσπόριο',
            value: tankCharacteristicsData?.gliospore,
            disabled: true,
          },
          {
            title: 'analysis',
            label: 'Ανάλυση',
            value: tankCharacteristicsData?.analysis,
            disabled: true,
          },
          {
            title: 'redness',
            label: 'Κόκκινα',
            value: tankCharacteristicsData?.redness,
            disabled: true,
          },
        ].map(characteristic => (
          <Pressable
            key={characteristic.label}
            style={styles(theme).characteristicLine}>
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
                editable={!characteristic.disabled}
                value={characteristic.value?.toString()}
                onChangeText={newValue => {
                  if (tankCharacteristicsData !== undefined) {
                    const newCharacteristicsData = {
                      ...tankCharacteristicsData,
                      [characteristic.title]: newValue,
                    };

                    setTankCharacteristicsData(newCharacteristicsData);
                  }
                }}></TextInput>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles(theme).bottomContainer}>
        <View style={styles(theme).submitButtonContainer}>
          <Pressable
            style={styles(theme).submitButton}
            onPress={async () => {
              setIsLoading(true);

              if (tankCharacteristicsData !== undefined) {
                const response = await submitTankCharacteristics(
                  tankCharacteristicsData,
                );

                setIsLoading(false);

                if (response !== undefined) {
                  Alert.alert('Επιτυχής Καταχώριση');
                } //if no signal?
              } else {
                Alert.alert('Εισάγετε δεξαμενή');
              }
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
