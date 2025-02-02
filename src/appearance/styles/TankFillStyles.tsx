import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    tankFillContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    topContainer: {
      justifyContent: 'space-between',
      margin: '2%',
      alignItems: 'center',
      height: '10%',
      display: 'flex',
      flexDirection: 'row',
    },
    title: {
      color: theme.textColor,
      fontSize: 24,
    },
    selectedTankText: {
      color: theme.textColor,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    middleContainer: {
      marginLeft: '5%',
      marginBottom: '2%',
      flexDirection: 'row',
    },
    labelListHeaderText: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: 28,
    },
    labelList: {
      elevation: 50,
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      marginLeft: '3%',
      marginRight: '3%',
    },
    bottomContainer: {
      margin: '2%',
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
