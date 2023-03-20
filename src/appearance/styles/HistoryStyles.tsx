import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    historyContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    historyHeader: {
      margin: '5%',
    },
    historyItem: {
      elevation: 5,
      borderRadius: 10,
      margin: '2%',
      flexDirection: 'row',
    },
    historyHeaderText: {
      fontWeight: 'bold',
      fontSize: 30,
      color: theme.textColor,
    },
    historyItemLeftPanel: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '16%',
    },
    historyItemLeftPanelText: {
      color: theme.buttonTextColor,
      fontSize: 30,
      fontWeight: 'bold',
    },
    historyItemHeaderContainer: {
      marginLeft: '4%',
      marginTop: '5%',
    },
    historyItemHeaderContainer2: {
      marginLeft: '4%',
    },
    historyItemHeaderText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    historyItemHeaderText2: {
      color: theme.buttonTextColor,
      fontSize: 18,
    },
    historyItemHeaderText3: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    historyItemHeaderText4: {
      color: theme.buttonTextColor,
      fontSize: 18,
    },
    historyItemLineText: {
      marginLeft: '4%',
      color: theme.buttonTextColor,
    },
    historyItemMaktx: {
      marginLeft: '4%',
    },
  });
