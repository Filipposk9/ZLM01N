import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    //main container
    transferPostingContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    middleContainer: {
      marginLeft: '5%',
      marginBottom: '2%',
      //width: '100%',
      flexDirection: 'row',
      //backgroundColor: '#ffffff', ////////////////////////////
    },
    labelListHeaderText: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: 24,
      width: '82%',
    },
    labelList: {
      height: '25%',
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      marginLeft: '3%',
      marginRight: '3%',
    },
    addLabelButtonContainer: {
      borderRadius: 50,
      borderColor: theme.borderColor,
      backgroundColor: '#ffb347', //theme.foregroundColor,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    //add label manually button
    addLabelButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addLabelButtonText: {
      fontSize: 32,
      color: theme.buttonTextColor,
    },
    bottomContainer: {
      margin: '2%',
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
      width: '50%',
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
