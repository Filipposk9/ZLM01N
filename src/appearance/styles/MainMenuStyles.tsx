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
  });
