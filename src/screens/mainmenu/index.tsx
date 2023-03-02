import React, {useContext} from 'react';
import {ScrollView, View, Pressable, Text} from 'react-native';
import {styles} from '../../styles/MainMenuStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {ThemeContext} from '../../styles/ThemeContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainMenuButton from './components/MainMenuButton';

function MainMenu({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles(theme).mainMenuContainer}>
      <View style={styles(theme).mainMenuHeader}>
        <Text style={styles(theme).mainMenuHeaderText}>Main Menu</Text>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={'TransferPosting'}
            icon={'forklift'}
            iconColor={'white'}
            text={'Ενδοδιακινήσεις'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={'Picking'}
            icon={'truck'}
            iconColor={'white'}
            text={'Παραδόσεις'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={'GoodsIssues'}
            icon={'material-ui'}
            iconColor={'white'}
            text={'Αναλώσεις'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'propane-tank-outline'}
            iconColor={'white'}
            text={'Χαρακτηριστικά Δεξαμενών'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'trash-2'}
            iconColor={'white'}
            text={'Λιώματα'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'barcode-scan'}
            iconColor={'white'}
            text={'Απογραφή'}></MainMenuButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default React.memo(MainMenu);
