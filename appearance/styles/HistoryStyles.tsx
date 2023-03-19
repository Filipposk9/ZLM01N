import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    historyContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    historyHeader: {
      margin: '5%',
    },
    historyHeaderText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: theme.textColor,
    },
    historyItemSuccess: {
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.foregroundColor,
      margin: '2%',
    },
    historyItemFailure: {
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.secondaryForegroundColor,
      margin: '2%',
    },
    historyItemText: {
      marginLeft: '5%',
      fontWeight: 'bold',
    },
    historyItemMaktx: {
      marginLeft: '5%',
    },
  });
