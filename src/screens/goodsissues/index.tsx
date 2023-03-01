import React, {useContext, useRef, useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import BarcodeScanner from '../../components/BarcodeScanner';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {styles} from '../../styles/GoodsIssuesStyles';
import {ThemeContext} from '../../styles/ThemeContext';

function GoodsIssues({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);
  const scannerRef = useRef<TextInput>(null);

  const [productionOrder, setProductionOrder] = useState('');

  const validateProductionOrder = (productionOrder: string) => {
    let productionOrderRegex = new RegExp('^1[0-9]{6}$');

    return productionOrderRegex.test(productionOrder);
  };

  const issueLabel = (lastScannedBarcode: string) => {
    console.log(lastScannedBarcode);
    //   onChangeText={invisibleText => {
    //     setInvisibleText(invisibleText);
    //     let splitText = invisibleText.split('-');
    //     let matnr = splitText[0];
    //     let found = productionOrderRef.current.lineItems.findIndex(
    //       lineItem => lineItem.componentMaterialNumber === matnr,
    //     );
    //     productionOrderRef.current.scrollViewSizeChanged(
    //       found * 30,
    //       invisibleText,
    //     );
    //     setInvisibleText('');
    //   }}
  };

  return (
    <View style={styles(theme).goodsIssuesContainer}>
      <View style={styles(theme).productionOrderInputContainer}>
        <Text style={styles(theme).productionOrderInputText}>
          Εντολή Παραγωγής:{' '}
        </Text>
        <TextInput
          style={styles(theme).productionOrderInputField}
          keyboardType="number-pad"
          onChangeText={productionOrder => setProductionOrder(productionOrder)}
          onSubmitEditing={async () => {
            if (validateProductionOrder(productionOrder)) {
              //   let response = await SapRequestHandler.getProductionOrderData(
              //     productionOrder,
              //   );
              //   setProductionOrderData(response);
              //   setProductionOrderKey(productionOrderKey + 1);
              //console.log(response);
            } else {
              Alert.alert('Λάθος αριθμός εντολής');
            }

            if (scannerRef.current) {
              scannerRef.current.focus();
            }
          }}
          value={productionOrder}></TextInput>
      </View>

      {/* Main Body uses an invisible text input to spawn a new label as soon as its scanned on this screen*/}
      {/* //TODO: remake into component BarcodeScanner */}

      {/* {productionOrderData !== undefined && productionOrderData !== null ? (
        <View style={styles(theme).bodyContainer}>
          <ProductionOrder
            key={productionOrderKey}
            ref={productionOrderRef}
            data={productionOrderData}
            onGoodsIssued={logState => {
              setLogBox(logState);
            }}
          />
        </View>
      ) : null} */}
      <View style={styles(theme).storageLocationListBtnView}>
        <Pressable
          onPress={() => {
            navigation.navigate('StorageLocationList');
          }}
          style={styles(theme).storageLocationListBtn}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).storageLocationListBtnText}>
            Λίστα Αποθηκευτικών Χώρων
          </Text>
        </Pressable>
      </View>

      {/* <View style={styles(theme).logBox}>
        <Text>
          Log:{' '}
          {productionOrderRef.current !== undefined &&
          productionOrderRef.current !== null
            ? logState
            : null}{' '}
        </Text>
      </View> */}
      <BarcodeScanner reference={scannerRef} onScan={issueLabel} />
    </View>
  );
}

export default React.memo(GoodsIssues);
