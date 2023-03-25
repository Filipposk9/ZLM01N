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
      fontSize: 30,
      color: theme.textColor,
    },
  });
