import {StyleSheet} from 'react-native';

export const GlobalStyles = (theme: any) =>
  StyleSheet.create({
    rippleColor: {color: theme.rippleColor, borderless: true},
  });
