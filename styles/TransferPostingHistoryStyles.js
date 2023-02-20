import {StyleSheet} from 'react-native';

export const styles = theme =>
  StyleSheet.create({
    transferPostingHistoryContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    transferPostingHistoryHeader: {
      margin: '5%',
    },
    transferPostingHistoryHeaderText: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    transferPostingHistoryItemSuccess: {
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.foregroundColor,
      margin: '2%',
    },
    transferPostingHistoryItemFailure: {
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.secondaryForegroundColor,
      margin: '2%',
    },
    transferPostingHistoryItemText: {
      marginLeft: '5%',
      fontWeight: 'bold',
    },
    transferPostingHistoryItemMaktx: {
      marginLeft: '5%',
    },
  });
