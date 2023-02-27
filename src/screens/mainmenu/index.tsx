import React, {useContext} from 'react';
import {ScrollView, View, Pressable, Text} from 'react-native';
import {styles} from '../../styles/MainMenuStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {ThemeContext} from '../../styles/ThemeContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function MainMenu({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <ScrollView
      style={styles(theme).mainMenuContainer}
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            navigation.navigate('TransferPosting');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <MaterialIcon name={'forklift'} color={'white'} size={30} />
          <Text style={styles(theme).mainMenuBtnText}>Ενδοδιακινήσεις</Text>
        </Pressable>
      </View>

      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            navigation.navigate('Picking');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <FeatherIcon name={'truck'} color={'white'} size={30} />
          <Text style={styles(theme).mainMenuBtnText}>Παραδόσεις</Text>
        </Pressable>
      </View>

      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            navigation.navigate('GoodsIssues');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <MaterialIcon name={'material-ui'} color={'white'} size={30} />
          <Text style={styles(theme).mainMenuBtnText}>Αναλώσεις</Text>
        </Pressable>
      </View>

      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            //navigation.navigate('');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <MaterialIcon
            name={'propane-tank-outline'}
            color={'white'}
            size={30}
          />
          <Text style={styles(theme).mainMenuBtnText}>
            Χαρακτηριστικά Δεξαμενών
          </Text>
        </Pressable>
      </View>

      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            //navigation.navigate('');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <FeatherIcon name={'trash-2'} color={'white'} size={30} />
          <Text style={styles(theme).mainMenuBtnText}>Λιώματα</Text>
        </Pressable>
      </View>

      <View style={styles(theme).mainMenuItem}>
        <Pressable
          style={styles(theme).mainMenuBtn}
          onPress={() => {
            //navigation.navigate('');
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <MaterialIcon name={'barcode-scan'} color={'white'} size={30} />
          <Text style={styles(theme).mainMenuBtnText}>Απογραφή</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default React.memo(MainMenu);
