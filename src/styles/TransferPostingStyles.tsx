import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    //main container
    transferPostingContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    labelListHeader: {margin: '5%'},
    labelListHeaderText: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: 24,
    },
    labelList: {
      height: '35%',
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      marginLeft: '3%',
      marginRight: '3%',
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
    bottomContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    //submit transfer posting button
    submitButtonContainer: {
      borderRadius: 30,
      borderColor: theme.borderColor,
      backgroundColor: theme.buttonBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.7,
    },
    submitButton: {
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.buttonTextColor,
    },
  });
