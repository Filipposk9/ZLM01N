import {StyleSheet} from 'react-native';
//TODO: rework styling, headers outside boxes, bottom border on headers
export const styles = (theme: any) =>
  StyleSheet.create({
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
    },
    transferPostingLogItem: {
      margin: '5%',
    },
  });
