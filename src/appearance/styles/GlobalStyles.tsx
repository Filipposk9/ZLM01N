import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const GlobalStyles = (theme: iTheme) =>
  StyleSheet.create({
    rippleColor: {color: theme.rippleColor, borderless: true},
  });
