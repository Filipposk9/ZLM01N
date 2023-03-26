import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/Types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    pickingContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    outboundDeliveryInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '5%',
      marginRight: '5%',
    },
    outboundDeliveryInput: {
      color: theme.textColor,
      fontSize: 30,
      fontWeight: 'bold',
    },
    outboundDeliveryInputField: {
      color: theme.textColor,
      fontSize: 24,
      width: 190,
      marginTop: '2%',
    },
    topContainer: {
      backgroundColor: theme.foregroundColor,
      elevation: 5,
      marginTop: '2%',
      marginLeft: '4%',
      marginRight: '4%',
      borderRadius: 10,
    },
    outboundDeliveryHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    outboundDeliveryHeaderItem: {
      width: '50%',
      padding: '2%',
    },
    outboundDeliveryHeaderTextLeft: {
      elevation: 5,
      color: theme.buttonTextColor,
      fontSize: 14,
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      padding: '4%',
    },
    outboundDeliveryHeaderTextRight: {
      color: theme.buttonTextColor,
      fontSize: 14,
      borderRadius: 10,
      padding: '4%',
    },
    outboundDeliveryStatusText: {
      backgroundColor: '#4B4B4E',
      borderRadius: 10,
      fontSize: 18,
      fontWeight: 'bold',
      margin: '2%',
      paddingLeft: '2%',
      width: '46%',
    },
    outboundDeliveryLinesContainer: {
      margin: '4%',
    },
  });
