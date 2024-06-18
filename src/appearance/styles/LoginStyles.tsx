import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    loginContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    darkModeSwitchContainer: {
      paddingTop: '10%',
      paddingRight: '10%',
      alignItems: 'flex-end',
      height: '30%',
    },
    usernameInput: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      width: '80%',
      color: theme.textColor,
      marginLeft: '9%',
    },
    passwordInput: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      width: '80%',
      color: theme.textColor,
      marginTop: '10%',
      marginLeft: '9%',
    },
    loginButtonContainer: {
      borderRadius: 20,
      borderColor: theme.buttonBorderColor,
      marginTop: '15%',
      width: '60%',
      height: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.buttonBackgroundColor,
      margin: '18%',
    },
    loginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    loginButtonText: {
      color: theme.buttonTextColor,
    },
  });
