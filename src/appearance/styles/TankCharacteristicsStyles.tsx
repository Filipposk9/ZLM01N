import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    tankCharacteristicsContainer: {
      height: '100%',
      backgroundColor: theme.backgroundColor,
    },
    tankNameContainer: {
      margin: '4%',
      flexDirection: 'row',
    },
    tankNameText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.textColor,
      marginTop: '2%',
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
      margin: '4%',
      height: '45%',
    },
    characteristicText: {
      marginLeft: '4%',
      color: theme.buttonTextColor,
      fontSize: 24,
      marginTop: '1.5%',
    },
    topContainer: {
      backgroundColor: theme.foregroundColor,
      marginBottom: '4%',
      margin: '4%',
      borderRadius: 15,
      elevation: 5,
    },
    headerContainer: {
      flexDirection: 'row',
      elevation: 5,
    },
    tankIconContainer: {
      width: '50%',
    },
    tankInfoContainer: {
      width: '54%',
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      elevation: 5,
      marginBottom: '4%',
      marginLeft: '4%',
      justifyContent: 'center',
    },
    tankInfoHeader: {
      alignItems: 'center',
    },
    tankInfoHeaderText: {
      color: theme.buttonTextColor,
      fontSize: 24,
      fontWeight: 'bold',
      margin: '4%',
    },
    tankInfoText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: '4%',
      marginBottom: '1%',
    },
    textInsideIcon: {
      width: '53%',
      borderRadius: 15,
      fontWeight: 'bold',
      fontSize: 30,
      zIndex: 1,
      marginTop: -82,
      marginLeft: 32,
    },
  });
