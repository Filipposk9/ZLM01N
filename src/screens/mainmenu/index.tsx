import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from '../../appearance/styles/MainMenuStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
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

//TODO: on back button -> perform logout actions, handle queue remnants
// useEffect(() => {
//   //   //FIXME: this runs even if i go back TO this screen,
//   //   //FIXME: should only work when i go back FROM this csreen
//   //   const handleBackPress = (): boolean => {
//   //     console.log(goodsMovementQueue);
//   //     if (goodsMovementQueue.goodsMovementQueue.length > 0) {
//   //       Alert.alert(
//   //         'Υπάρχουν κινήσεις στην ούρα οι οποίες δεν έχουν πραγματοποιηθεί, παρακαλώ...',
//   //       );
//   //     }
//   //     navigation.goBack();
//   //     return true;
//   //   };
//   //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//   //   return () => {
//   //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//   //   };
// }, []);
