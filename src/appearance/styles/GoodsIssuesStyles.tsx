import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    goodsIssuesContainer: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
    productionOrderInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: '5%',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      margin: '2%',
    },
    productionOrderInputText: {
      color: theme.textColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    productionOrderInputField: {
      color: theme.textColor,
      fontSize: 20,
      width: '100%',
    },
    productionOrderContainer: {
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: '5%',
      height: 390,
    },
    productionOrderHeaderContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    productionOrderHeaderText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.textColor,
    },
    productionOrderHeaderContent: {
      color: theme.textColor,
    },
    componentMaterialText: {
      fontSize: 12,
      width: '75%',
      color: 'white',
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
      color: theme.textColor,
    },
    labelList: {
      height: '35%',
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      marginLeft: '3%',
      marginRight: '3%',
    },
  });
