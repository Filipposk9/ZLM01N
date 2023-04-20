import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    tankMapContainer: {
      //   height: '100%',
      //   backgroundColor: theme.backgroundColor,
    },
    tankContainer: {
      backgroundColor: theme.foregroundColor,
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
