import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
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
