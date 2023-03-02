import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    mainMenuHeader: {},
    mainMenuHeaderText: {
      fontWeight: 'bold',
      fontSize: 30,
      margin: '7%',
      color: theme.textColor,
    },
    mainMenuContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    mainMenuLine: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    mainMenuItem: {
      //borderWidth: 1,
      borderColor: theme.borderColor,
      margin: '3%',
      width: '42%',
      borderRadius: 20,
      //flexDirection: 'column',
    },
    mainMenuBtn: {
      //borderWidth: 1,
      borderColor: theme.borderColor,
      //margin: '8%',
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainMenuBtnTextContainer: {
      alignItems: 'center',
    },
    mainMenuBtnText: {
      color: theme.buttonTextColor,
      fontSize: 20,
    },
  });
