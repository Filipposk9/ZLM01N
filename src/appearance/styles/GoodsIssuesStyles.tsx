import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/Types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    topContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    goodsIssuesContainer: {
      backgroundColor: theme.foregroundColor,
      elevation: 5,
      margin: '4%',
      borderRadius: 10,
    },
    productionOrderInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: '5%',
      marginRight: '5%',
    },
    productionOrderInputText: {
      color: theme.textColor,
      fontSize: 24,
      fontWeight: 'bold',
    },
    productionOrderInputField: {
      color: theme.textColor,
      fontSize: 24,
      width: 190,
      marginTop: '2%',
    },
    productionOrderContainer: {
      backgroundColor: theme.foregroundColor,
      elevation: 5,
      marginTop: '2%',
      marginLeft: '4%',
      marginRight: '4%',
      borderRadius: 10,
    },
    productionOrderHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    productionOrderHeaderItem: {
      width: '50%',
      padding: '2%',
    },
    productionOrderHeaderTextLeft: {
      elevation: 5,
      color: theme.buttonTextColor,
      fontSize: 14,
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      padding: '4%',
    },
    productionOrderHeaderTextRight: {
      color: theme.buttonTextColor,
      fontSize: 14,
      borderRadius: 10,
      padding: '4%',
    },
    productionOrderStatusText: {
      backgroundColor: '#4B4B4E',
      borderRadius: 10,
      fontSize: 18,
      fontWeight: 'bold',
      margin: '2%',
      paddingLeft: '2%',
    },
    productionOrderHeaderContent: {
      color: theme.textColor,
    },
    componentMaterialText: {
      fontSize: 12,
      width: '67%',
      color: theme.buttonTextColor,
    },
    componentQuantity: {
      alignItems: 'flex-end',
      flex: 1,
    },
    componentCategory: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: '2%',
      marginBottom: '2%',
      color: theme.buttonTextColor,
    },
  });
