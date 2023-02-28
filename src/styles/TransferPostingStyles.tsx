import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    //main container
    transferPostingContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    //bottom panel container
    bottomPanelContainer: {
      flexDirection: 'row',
      margin: '3%',
    },
    //history button
    historyButtonContainer: {
      backgroundColor: theme.foregroundColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      width: '40%',
    },
    historyButton: {
      alignItems: 'center',
      width: '100%',
    },
    historyButtonText: {
      color: theme.buttonTextColor,
    },
    addLabelButtonContainer: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      marginLeft: '45%',
    },
    //add label manually button
    addLabelButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addLabelButtonText: {
      fontSize: 26,
      color: theme.buttonTextColor,
    },
    //submit transfer posting button
    submitButtonContainer: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '3%',
    },
    submitButton: {
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonText: {
      fontSize: 16,
      color: theme.buttonTextColor,
    },
  });
