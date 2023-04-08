import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    profileContainer: {
      height: '100%',
      backgroundColor: theme.backgroundColor,
    },
    profileEmblemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '40%',
    },
    profileEmblem: {
      borderRadius: 100,
      height: 100,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.foregroundColor,
    },
    profileEmblemText: {
      color: '#ffffff',
      fontSize: 32,
    },
    profileEmblemDescription: {
      marginTop: '3%',
      fontSize: 24,
      color: theme.secondaryTextColor,
    },
    profileInfoContainer: {
      margin: '2%',
      backgroundColor: theme.secondaryBackgroundColor,
      borderRadius: 5,
    },
    profileInfoLine: {},
    profileInfoLineText: {
      color: theme.secondaryTextColor,
      fontSize: 18,
      margin: '2%',
    },
  });
