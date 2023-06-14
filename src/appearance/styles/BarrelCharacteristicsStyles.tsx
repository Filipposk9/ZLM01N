import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    barrelCharacteristicsContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    topContainer: {
      backgroundColor: theme.secondaryBackgroundColor,
    },
    headerText: {
      color: theme.textColor,
    },
  });
