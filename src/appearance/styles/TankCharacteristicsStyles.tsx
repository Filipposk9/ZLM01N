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
      margin: '4%',
      borderRadius: 15,
      elevation: 5,
    },
    characteristicText: {
      marginLeft: '4%',
      color: theme.buttonTextColor,
      fontSize: 24,
      marginTop: '1%',
      marginBottom: '1%',
    },
    topContainer: {
      flexDirection: 'row',
      backgroundColor: theme.foregroundColor,
      margin: '4%',
      borderRadius: 15,
    },
    tankIconContainer: {
      justifyContent: 'center',
      width: '47%',
    },
    tankInfoContainer: {
      width: '50%',
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      elevation: 5,
      marginTop: '4%',
      marginBottom: '4%',
      marginRight: '4%',
    },
    tankInfoText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
      margin: '4%',
    },
  });
