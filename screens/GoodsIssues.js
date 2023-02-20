import React, {useContext, useState, useRef} from 'react';

import {View, Text, TextInput, Pressable} from 'react-native';
import SapRequestHandler from '../sap/SapRequestHandler';

import ProductionOrder from '../components/ProductionOrder';

import {GlobalStyles} from '../styles/GlobalStyles';
import {styles} from '../styles/GoodsIssuesStyles';
import {ThemeContext} from '../styles/ThemeContext';

//FIXME: Icon bottom margin fix

export default GoodsIssues = ({navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  const productionOrderRef = useRef();
  const invisibleInputRef = useRef();

  const [invisibleText, setInvisibleText] = useState();

  const [productionOrder, setProductionOrder] = useState();
  const [productionOrderData, setProductionOrderData] = useState();
  const [productionOrderKey, setProductionOrderKey] = useState(0);

  const [logState, setLogState] = useState('');

  const validateProductionOrder = prodOrd => {
    let productionOrderRegex = new RegExp('^1[0-9]{6}$');

    return productionOrderRegex.test(prodOrd);
  };

  const focusInvisibleInput = e => {
    e.preventDefault();
    if (invisibleInputRef.current) {
      invisibleInputRef.current.focus();
    }
  };

  const setLogBox = logState => {
    setLogState(logState);
    setProductionOrderKey(productionOrderKey + 1);
    //TODO: proper refresh
  };

  return (
    <View
      style={styles(theme).goodsIssuesContainer}
      onTouchStart={focusInvisibleInput}>
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
              let response = await SapRequestHandler.getProductionOrderData(
                productionOrder,
              );

              setProductionOrderData(response);
              setProductionOrderKey(productionOrderKey + 1);

              //console.log(response);

              invisibleInputRef.current.focus();
            } else {
              alert('Λάθος αριθμός εντολής');
            }
          }}
          value={productionOrder}></TextInput>
      </View>
      <View
        style={styles(theme).invisibleInputContainer}
        onTouchStart={focusInvisibleInput}>
        {/* Main Body uses an invisible text input to spawn a new label as soon as its scanned on this screen*/}
        {/* //TODO: remake into component BarcodeScanner */}
        <TextInput
          ref={invisibleInputRef}
          showSoftInputOnFocus={false}
          autoFocus={true}
          autoCorrect={false}
          autoComplete={'off'}
          caretHidden={true}
          style={{opacity: 0, height: 0}}
          value={invisibleText}
          onChangeText={invisibleText => {
            setInvisibleText(invisibleText);

            let splitText = invisibleText.split('-');
            let matnr = splitText[0];

            let found = productionOrderRef.current.lineItems.findIndex(
              lineItem => lineItem.componentMaterialNumber === matnr,
            );

            productionOrderRef.current.scrollViewSizeChanged(
              found * 30,
              invisibleText,
            );

            setInvisibleText('');
          }}
        />
      </View>
      {productionOrderData !== undefined && productionOrderData !== null ? (
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
      ) : null}
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

      <View style={styles(theme).logBox}>
        <Text>
          Log:{' '}
          {productionOrderRef.current !== undefined &&
          productionOrderRef.current !== null
            ? logState
            : null}{' '}
        </Text>
      </View>
    </View>
  );
};
