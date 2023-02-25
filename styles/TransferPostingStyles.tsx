import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    //main container
    transferPostingContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    //storage location selection list
    storageLocationBox: {
      backgroundColor: theme.foregroundColor,
      margin: '3%',
      borderColor: theme.borderColor,
      borderRadius: 20,
    },
    storageLocationInput: {
      color: theme.buttonTextColor,
      margin: '2%',
    },
    storageLocationText: {
      margin: '2%',
    },
    //invisible text input
    invisibleInputContainer: {
      height: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    //bottom panel container
    bottomPanelContainer: {
      flexDirection: 'row',
    },
    //history button
    historyBtnContainer: {
      backgroundColor: theme.foregroundColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 20,
      marginLeft: '4%',
      justifyContent: 'center',
    },
    historyBtn: {
      alignItems: 'center',
      width: 150,
    },
    historyBtnText: {
      color: theme.buttonTextColor,
    },
    addLabelBtnContainer: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      marginLeft: '40%',
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
    submitBtnContainer: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4%',
    },
    submitBtn: {
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitBtnText: {
      fontSize: 16,
      color: theme.buttonTextColor,
    },
  });
