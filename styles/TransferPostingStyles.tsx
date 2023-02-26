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
      marginTop: '65%',
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
    addLabelBtnContainer: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      marginLeft: '45%',
    },
    //add label manually button
    addLabelBtn: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addLabelBtnText: {
      fontSize: 26,
      color: theme.buttonTextColor,
    },
    //popup dialog
    popupContainer: {
      borderRadius: 20,
      borderColor: theme.borderColor,
      borderWidth: 1,
      backgroundColor: theme.backgroundColor,
    },
    popupHeaderContainer: {
      alignItems: 'center',
      borderRadius: 20,
      margin: 10,
    },
    popupHeaderText: {
      color: theme.secondaryTextColor,
      fontSize: 20,
    },
    popupBodyContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    popupBodyText: {
      color: theme.secondaryTextColor,
    },
    popupFooterContainer: {
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      borderBottomLeftWidth: 1,
      borderBottomLeftColor: theme.borderColor,
      borderBottomLeftRadius: 20,
      borderBottomRightWidth: 1,
      borderBottomRightColor: theme.borderColor,
      borderBottomRightRadius: 20,
    },
    //submit manually typed label button
    popupSubmitBtn: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    popupSubmitBtnText: {
      color: theme.buttonTextColor,
      fontSize: 16,
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
