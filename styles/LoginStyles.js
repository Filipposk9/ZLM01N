import {StyleSheet} from 'react-native';

export const styles = theme =>
  StyleSheet.create({
    loginContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    toggleAppearanceView: {
      paddingTop: '10%',
      paddingRight: '10%',
      alignItems: 'flex-end',
      height: '30%',
    },
    toggleAppearanceBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBodyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    usernameInput: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      width: '80%',
      color: theme.textColor,
    },
    passwordInput: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      width: '80%',
      color: theme.textColor,
      marginTop: '10%',
    },
    loginBtnView: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.buttonBorderColor,
      marginTop: '15%',
      width: '60%',
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.foregroundColor,
    },
    loginBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    loginBtnText: {
      color: theme.buttonTextColor,
    },
  });
