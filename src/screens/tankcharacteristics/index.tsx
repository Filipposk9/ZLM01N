import React, {useContext} from 'react';
import {View, Dimensions, Text} from 'react-native';
import Icon from '../../appearance/assets/Icon';
import {ThemeContext} from '../../appearance/theme/ThemeContext';

function TankCharacteristics({navigation}: {navigation: any}): JSX.Element {
  const {theme, dark} = useContext(ThemeContext);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: theme.backgroundColor,
      }}>
      <View style={{height: '10%'}}>
        <Text
          style={{
            margin: '4%',
            fontSize: 30,
            fontWeight: 'bold',
            color: theme.textColor,
          }}>
          Δεξαμενή: CU123
        </Text>

        <View
          style={{
            backgroundColor: theme.secondaryForegroundColor,
            margin: '4%',
            borderRadius: 15,
            elevation: 5,
          }}>
          <Text
            style={{
              marginLeft: '4%',
              color: theme.buttonTextColor,
              fontSize: 24,
              marginTop: '1%',
              marginBottom: '1%',
            }}>
            Characteristic 1: Value
          </Text>
          <Text
            style={{
              marginLeft: '4%',
              color: theme.buttonTextColor,
              fontSize: 24,
              marginTop: '1%',
              marginBottom: '1%',
            }}>
            Characteristic 2: Value
          </Text>
          <Text
            style={{
              marginLeft: '4%',
              color: theme.buttonTextColor,
              fontSize: 24,
              marginTop: '1%',
              marginBottom: '1%',
            }}>
            Characteristic 3: Value
          </Text>
          <Text
            style={{
              marginLeft: '4%',
              color: theme.buttonTextColor,
              fontSize: 24,
              marginTop: '1%',
              marginBottom: '1%',
            }}>
            Characteristic 4: Value
          </Text>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
        }}>
        <Icon
          name={'propane-tank'}
          color={dark ? 'white' : theme.foregroundColor}
          size={Dimensions.get('window').width}></Icon>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.secondaryForegroundColor,
            borderRadius: 10,
            height: '8%',
            margin: '4%',
            elevation: 5,
            flexDirection: 'row',
          }}>
          <Icon name={'fruit-cherries'} color={'#95aa9d'} size={40}></Icon>
          <Text
            style={{
              color: theme.buttonTextColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            ΕΛ ΠΡΑ ΧΑΛ ΣΥΜ ΙΣΠ ΟΛΟΚ ΑΔ ΠΑΡ 71-140
          </Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(TankCharacteristics);
