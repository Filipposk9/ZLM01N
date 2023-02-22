import React, {useContext} from 'react';

import {Pressable, Text, View, ScrollView} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../styles/ThemeContext.js';
import {styles} from '../styles/MainMenuStyles.js';
import {GlobalStyles} from '../styles/GlobalStyles';

export default MainMenu = ({navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  //TODO: When navigate back, reset redux store, prompt to logout

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
};
