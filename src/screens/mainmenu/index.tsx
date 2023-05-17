import React, {useContext} from 'react';
import {ScrollView, View, Text, BackHandler, Alert} from 'react-native';
import {styles} from '../../appearance/styles/MainMenuStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import MainMenuButton from './components/MainMenuButton';
import {useFocusEffect} from '@react-navigation/native';

function MainMenu({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = (): boolean => {
        // if (goodsMovementQueue.goodsMovementQueue.length > 0) {
        //   Alert.alert(
        //     'Υπάρχουν κινήσεις στην ούρα οι οποίες δεν έχουν πραγματοποιηθεί, παρακαλώ...',
        //   );
        // }Handle Queue && CookieManager.clearAll();

        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, []),
  );

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
            backgroundColor={'#14AE5C'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={'Picking'}
            icon={'truck'}
            iconColor={'white'}
            text={'Παραδόσεις'}
            backgroundColor={'#ED8B00'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={'GoodsIssues'}
            icon={'issue-reopened'}
            iconColor={'white'}
            text={'Αναλώσεις'}
            backgroundColor={'#D22730'}></MainMenuButton>

          <MainMenuButton
            navigation={navigation}
            navigationLocation={'TankCharacteristics'}
            icon={'propane-tank-outline'}
            iconColor={'white'}
            text={'Χαρακτηριστικά Δεξαμενών'}
            backgroundColor={'#0f52ba'}></MainMenuButton>
        </View>

        <View style={styles(theme).mainMenuLine}>
          <MainMenuButton
            navigation={navigation}
            navigationLocation={'Mashes'}
            icon={'trash-2'}
            iconColor={'#222222'}
            text={'Λιώματα'}
            backgroundColor={'#676a6f'}></MainMenuButton>

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
