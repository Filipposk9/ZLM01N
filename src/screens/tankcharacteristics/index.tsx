import React, {useContext, useState} from 'react';
import {View, Dimensions, Text, Alert} from 'react-native';
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
      <View style={styles(theme).tankNameContainer}>
        <Text style={styles(theme).tankNameText}>Δεξαμενή: </Text>
        <TextInput
          style={styles(theme).tankNameInput}
          autoCapitalize="characters"
          onChangeText={tank => {
            setTank(tank);
          }}
          value={tank}
          onSubmitEditing={() => {
            getTankCharacteristics();
          }}></TextInput>
      </View>

      <View style={styles(theme).topContainer}>
        <View style={styles(theme).tankIconContainer}>
          <Icon
            name={'propane-tank'}
            color={'white'}
            size={Dimensions.get('window').width / 2.2}></Icon>
        </View>

        <View style={styles(theme).tankInfoContainer}>
          <Text style={styles(theme).tankInfoText}>
            {tankCharacteristicsData?.materialText}
          </Text>
          {tankCharacteristicsData?.batch.length
            ? tankCharacteristicsData?.batch.map(item => {
                return <Text>{item}</Text>;
              })
            : null}
        </View>
      </View>

      <View style={styles(theme).characteristicsContainer}>
        <Text style={styles(theme).characteristicText}>
          Characteristic 1: Value
        </Text>
        <Text style={styles(theme).characteristicText}>
          Characteristic 2: Value
        </Text>
        <Text style={styles(theme).characteristicText}>
          Characteristic 3: Value
        </Text>
        <Text style={styles(theme).characteristicText}>
          Characteristic 4: Value
        </Text>
      </View>
    </View>
  );
}

export default React.memo(TankCharacteristics);
