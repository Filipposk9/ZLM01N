import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    pickingContainer: {
      backgroundColor: theme.backgroundColor,
      width: '100%',
      height: '100%',
      flex: 1,
    },
    outboundDeliveryInputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      flexDirection: 'row',
      alignItems: 'center',
      margin: '5%',
    },
    outboundDeliveryInput: {
      color: theme.textColor,
      fontSize: 16,
    },
    outboundDeliveryInputField: {
      color: theme.textColor,
      fontSize: 16,
      width: 190,
    },
    outboundDeliveryContainer: {
      backgroundColor: theme.foregroundColor,
      margin: '4%',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: theme.borderColor,
    },
    outboundDeliveryHeaderText: {
      color: theme.buttonTextColor,
      fontSize: 16,
      marginLeft: '4%',
      marginBottom: '1%',
      marginTop: '2%',
    },
    outboundDeliveryLinesContainer: {
      margin: '4%',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: theme.borderColor,
      borderTopColor: theme.borderColor,
      height: '60%',
    },
    outboundDeliveryLine: {
      backgroundColor: theme.foregroundColor,
    },
    outboundDeliveryLinesText: {
      color: theme.buttonTextColor,
    },
    outboundDeliveryHandlingUnitsContainer: {
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      marginBottom: '2%',
    },
    outboundDeliveryHandlingUnitsText: {
      color: theme.buttonTextColor,
      marginLeft: '4%',
    },
  });
