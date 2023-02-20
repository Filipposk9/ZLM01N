import {StyleSheet} from 'react-native';

export const GlobalStyles = theme =>
  StyleSheet.create({
    rippleColor: {color: theme.rippleColor, borderless: true},
  });
