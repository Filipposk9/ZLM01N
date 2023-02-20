import {StyleSheet} from 'react-native';

export const styles = theme =>
  StyleSheet.create({
    mainMenuContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    mainMenuItem: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      margin: '5%',
      width: '85%',
      height: 85,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.foregroundColor,
      flexDirection: 'row',
    },
    mainMenuBtn: {
      alignItems: 'center',
      paddingLeft: '5%',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    mainMenuBtnText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      paddingLeft: '5%',
    },
  });
