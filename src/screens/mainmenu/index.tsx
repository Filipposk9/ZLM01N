import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from '../../styles/MainMenuStyles';
import {ThemeContext} from '../../styles/ThemeContext';
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
            text={'Ενδοδιακινήσεις'}
            backgroundColor={'#77dd77'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={'Picking'}
            icon={'truck'}
            iconColor={'white'}
            text={'Παραδόσεις'}
            backgroundColor={'#EFBE7D'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={'GoodsIssues'}
            icon={'material-ui'}
            iconColor={'white'}
            text={'Αναλώσεις'}
            backgroundColor={'#E9EC6B'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'propane-tank-outline'}
            iconColor={'white'}
            text={'Χαρακτηριστικά Δεξαμενών'}
            backgroundColor={'#8BD3E6'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'trash-2'}
            iconColor={'white'}
            text={'Λιώματα'}
            backgroundColor={'#43464b'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={''}
            icon={'barcode-scan'}
            iconColor={'white'}
            text={'Απογραφή'}
            backgroundColor={'#2E1A47'}></MainMenuButton>
        </View>
      </ScrollView>
    </View>
  );
}

export default React.memo(MainMenu);
