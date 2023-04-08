import React, {useContext} from 'react';
import {View, Dimensions, Text} from 'react-native';
import Icon from '../../appearance/assets/Icon';
import {styles} from '../../appearance/styles/TankCharacteristicsStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';

function TankCharacteristics({navigation}: {navigation: any}): JSX.Element {
  const {theme, dark} = useContext(ThemeContext);

  return (
    <View style={styles(theme).tankCharacteristicsContainer}>
      <View style={styles(theme).tankNameContainer}>
        <Text style={styles(theme).tankNameText}>Δεξαμενή: CU123</Text>
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
            ΕΛ ΠΡΑ ΧΑΛ ΣΥΜ ΙΣΠ ΟΛΟΚ ΑΔ ΠΑΡ 71-140
          </Text>
          <Text style={styles(theme).tankInfoText}>CU12322052</Text>
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
