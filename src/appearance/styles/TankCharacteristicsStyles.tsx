import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    tankCharacteristicsContainer: {
      height: '100%',
      backgroundColor: theme.backgroundColor,
    },
    tankNameInput: {
      width: '55%',
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    characteristicsContainer: {
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 15,
      elevation: 5,
      marginLeft: '4%',
      marginRight: '4%',
    },
    characteristicLine: {
      marginLeft: '4%',
      flexDirection: 'row',
    },
    characteristicText: {
      flex: 1,
      color: theme.buttonTextColor,
      fontSize: 18,
    },
    characteristicInputContainer: {
      marginRight: '4%',
    },
    characteristicInput: {
      flex: 1,
      color: theme.buttonTextColor,
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'flex-end',
    },
    topContainer: {
      backgroundColor: theme.foregroundColor,
      marginBottom: '2%',
      marginTop: '1%',
      marginLeft: '4%',
      marginRight: '4%',
      borderRadius: 15,
      elevation: 5,
    },
    headerContainer: {
      flexDirection: 'row',
      elevation: 5,
    },
    tankInfoContainer: {
      width: '54%',
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      elevation: 5,
      marginBottom: '2%',
      marginLeft: '4%',
      justifyContent: 'center',
    },
    tankInfoHeader: {
      alignItems: 'center',
    },
    tankInfoHeaderText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
      margin: '2%',
    },
    tankInfoText: {
      color: theme.buttonTextColor,
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: '4%',
      marginBottom: '1%',
    },
    textInsideIcon: {
      width: '60%',
      fontWeight: 'bold',
      fontSize: 26,
      zIndex: 1,
      marginTop: -85,
      marginLeft: 30,
    },
    bottomContainer: {
      margin: '1%',
      alignItems: 'center',
      justifyContent: 'center',
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
