import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    pickingContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      paddingTop: '1%',
    },
    outboundDeliveryInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginLeft: '4%',
      marginRight: '4%',
    },
    outboundDeliveryInput: {
      color: theme.textColor,
      fontSize: 28,
      fontWeight: 'bold',
    },
    outboundDeliveryHeaderText: {
      color: theme.textColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    outboundDeliveryInputField: {
      color: theme.textColor,
      fontSize: 24,
      width: 185,
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
    outboundDeliveryHeaderContainer2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '4%',
      marginRight: '4%',
    },
    outboundDeliveryHeaderItem: {
      width: '50%',
      padding: '2%',
      justifyContent: 'center',
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
      padding: '4%',
      height: 60,
    },
    outboundDeliveryCameraButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 5,
      padding: '4%',
      backgroundColor: theme.buttonSecondaryBackgroundColor,
    },
    outboundDeliveryLinesContainer: {
      margin: '4%',
      height: '60%',
    },
  });
