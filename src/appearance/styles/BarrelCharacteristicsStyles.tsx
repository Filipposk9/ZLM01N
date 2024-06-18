import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    barrelCharacteristicsContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    topContainer: {
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      margin: '2%',
    },
    headerText: {
      color: theme.buttonTextColor,
      marginLeft: '4%',
      marginRight: '4%',
      marginTop: '1%',
      fontSize: 18,
      fontWeight: 'bold',
    },
    basicCharacteristicsBox: {
      backgroundColor: theme.foregroundColor,
      borderRadius: 10,
      margin: '2%',
      elevation: 25,
    },
    basicCharacteristicsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    basicCharacteristicsSlider: {
      width: '83%',
    },
    basicCharacteristicsTextContainer: {
      flex: 1,
      alignItems: 'flex-end',
      marginRight: '2%',
    },
    basicCharacteristicsText: {
      color: theme.buttonTextColor,
      marginLeft: '4%',
      marginTop: '2%',
      fontSize: 18,
    },
    basicCharacteristicsValue: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    bottomContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      margin: '2%',
    },
    submitButtonContainer: {
      elevation: 50,
      borderRadius: 30,
      borderColor: theme.borderColor,
      backgroundColor: theme.buttonThirdBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
    },
    submitButton: {
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    submitButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.buttonTextColor,
    },
  });
