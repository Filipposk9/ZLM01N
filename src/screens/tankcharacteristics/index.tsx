import React, {useContext, useState} from 'react';
import {View, ScrollView, Dimensions, Text, Alert} from 'react-native';
import Icon from '../../appearance/assets/Icon';
import {styles} from '../../appearance/styles/TankCharacteristicsStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {TextInput} from 'react-native-gesture-handler';
import {iTankCharacteristics} from '../../shared/Types';
import SapStructureValidator from '../../utilities/validators/SapStructureValidator';
import Repository from '../../data/Repository';

function TankCharacteristics({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [tank, setTank] = useState<string>('');
  const [tankCharacteristicsData, setTankCharacteristicsData] =
    useState<iTankCharacteristics>();

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

      <View style={styles(theme).characteristicsContainer}>
        <Text style={styles(theme).characteristicText}>
          Τεμαχισμός: {tankCharacteristicsData?.unitsPerKg}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Δάκος: {tankCharacteristicsData?.oliveFly}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Γλοιοσπόριο: {tankCharacteristicsData?.gliospore}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Ποιότητα Χρώματος: {tankCharacteristicsData?.colorQuality}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Σκληρότητα: {tankCharacteristicsData?.hardness}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Ανάλυση: {tankCharacteristicsData?.analysis}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Κόκκινα: {tankCharacteristicsData?.oliveFly}
        </Text>

        <Text style={styles(theme).characteristicText}>
          pH: {tankCharacteristicsData?.pH}
        </Text>

        <Text style={styles(theme).characteristicText}>
          Αλάτι: {tankCharacteristicsData?.salt}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(TankCharacteristics);
