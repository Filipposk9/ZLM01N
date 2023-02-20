import {StyleSheet} from 'react-native';

export const styles = theme =>
  StyleSheet.create({
    goodsIssuesContainer: {
      backgroundColor: theme.backgroundColor,
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    productionOrderInputField: {
      color: theme.textColor,
      fontSize: 18,
      width: '100%',
    },
    invisibleInputContainer: {
      height: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyContainer: {
      margin: '4%',
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
    },
    componentMaterialText: {
      fontSize: 12,
      width: '75%',
    },
    componentQuantity: {
      alignItems: 'flex-end',
      flex: 1,
    },
    componentCategory: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: '2%',
      marginBottom: '2%',
    },
    scannedLabelPopup: {
      backgroundColor: theme.backgroundColor,
      borderColor: theme.borderColor,
      borderTopLeftWidth: 1,
      borderTopLeftRadius: 20,
      borderTopRightWidth: 1,
      borderTopRightRadius: 20,
    },
    scannedLabelHeader: {
      marginLeft: '5%',
      marginBottom: '2%',
      marginTop: '2%',
      fontWeight: 'bold',
    },
    scannedLabelText: {
      marginLeft: '5%',
      marginBottom: '2%',
    },
    scannedLabelButtonView: {
      backgroundColor: theme.foregroundColor,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftWidth: 1,
      borderBottomRightWidth: 1,
      borderColor: theme.borderColor,
      borderTopWidth: 1,
    },
    scannedLabelButton: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    scannedLabelButtonText: {
      color: theme.buttonTextColor,
      fontWeight: 'bold',
      fontSize: 16,
    },
    storageLocationListBtnView: {
      backgroundColor: theme.foregroundColor,
      marginLeft: '2%',
      marginRight: '2%',
      marginBottom: '2%',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    storageLocationListBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: '100%',
    },
    storageLocationListBtnText: {
      color: theme.buttonTextColor,
    },
    logBox: {paddingLeft: '2%'},
  });
