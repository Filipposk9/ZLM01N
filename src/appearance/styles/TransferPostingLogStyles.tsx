import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    transferPostingLogTopContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    transferPostingLogHeaderContainer: {
      margin: '5%',
    },
    transferPostingLogHeaderLine: {
      flexDirection: 'row',
    },
    transferPostingLogHeaderText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: theme.textColor,
    },
    transferPostingLogContainer: {
      elevation: 5,
      borderRadius: 15,
      margin: '5%',
      backgroundColor: theme.foregroundColor,
    },
    transferPostingLogTitle: {
      marginLeft: '5%',
      marginTop: '2%',
      fontWeight: 'bold',
      fontSize: 20,
      color: theme.textColor,
    },
    transferPostingLogMaterialNumber: {
      marginLeft: '5%',
      marginTop: '2%',
      fontWeight: 'bold',
      fontSize: 20,
      color: theme.buttonTextColor,
    },
    transferPostingLogItem: {
      marginTop: '2%',
      flexDirection: 'row',
    },
    transferPostingLogPanelLeft: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '16%',
    },
    transferPostingLogTextLeft: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.buttonTextColor,
    },
    transferPostingLogPanelRight: {width: '80%'},
    transferPostingLogTextRight: {fontSize: 16},
  });
