import {StyleSheet} from 'react-native';
//TODO: rework styling, headers outside boxes, bottom border on headers
export const styles = (theme: any) =>
  StyleSheet.create({
    transferPostingLogTopContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    transferPostingLogHeaderContainer: {
      margin: '5%',
    },
    transferPostingLogHeaderLine: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    transferPostingLogHeaderText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.textColor,
    },
    transferPostingLogContainer: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 20,
      margin: '5%',
      backgroundColor: theme.foregroundColor,
    },
    transferPostingLogTitle: {
      margin: '5%',
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.textColor,
    },
    transferPostingLogItem: {
      margin: '5%',
    },
    transferPostingLogItemText: {
      color: theme.textColor,
    },
  });
