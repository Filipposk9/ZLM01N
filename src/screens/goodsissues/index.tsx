import React, {useContext, useRef, useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import Repository from '../../data/Repository';
import {
  Label,
  MaterialDocument,
  ProductionOrder,
  ProductionOrderComponent,
} from '../../shared/Types';
import {styles} from '../../appearance/styles/GoodsIssuesStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {GOODS_MOVEMENT_CODE, MOVEMENT_TYPE} from '../../shared/Constants';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';

function GoodsIssues({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);
  const scannerRef = useRef<TextInput>(null);

  const [productionOrder, setProductionOrder] = useState('');
  const [productionOrderData, setProductionOrderData] = useState<
    ProductionOrder | undefined
  >();

  const [olivesGroup, setOlivesGroup] = useState<
    ProductionOrderComponent[] | undefined
  >([]);
  const [secondaryMaterialsGroup, setSecondaryMaterialsGroup] = useState<
    ProductionOrderComponent[] | undefined
  >([]);
  const [packagingGroup, setPackagingGroup] = useState<
    ProductionOrderComponent[] | undefined
  >([]);
  const [byProductsGroup, setByProductsGroup] = useState<
    ProductionOrderComponent[] | undefined
  >([]);

  const [scannedLabels, setScannedLabels] = useState<Label[]>();

  const materialLabelFilter = (lastScannedBarcode: string) => {
    //
  };

  const validateProductionOrder = (productionOrder: string) => {
    let productionOrderRegex = new RegExp('^1[0-9]{6}$');

    return productionOrderRegex.test(productionOrder);
  };

  const getProductionOrderData = () => {
    const getProductionOrderData = async () => {
      if (validateProductionOrder(productionOrder)) {
        const response = await Repository.getProductionOrder(productionOrder);

        if (response !== undefined) {
          setProductionOrderData(response);

          setOlivesGroup(
            response?.components.filter(
              component =>
                component.materialGroup.substring(0, 2) === '01' &&
                component.movementType === '261',
            ),
          );

          setSecondaryMaterialsGroup(
            response?.components.filter(
              component =>
                (component.materialGroup.substring(0, 2) === '02' ||
                  component.materialGroup.substring(0, 2) === '03' ||
                  component.materialGroup.substring(0, 2) === '04' ||
                  component.materialGroup.substring(0, 2) === '05') &&
                component.movementType === '261',
            ),
          );

          setPackagingGroup(
            response?.components.filter(
              component => component.materialGroup.substring(0, 2) === '06',
            ),
          );

          setByProductsGroup(
            response?.components.filter(
              component => component.movementType === '531',
            ),
          );
        }
      } else {
        Alert.alert('Λάθος αριθμός εντολής');
      }
    };

    getProductionOrderData();
  };

  // const addLabel = async (lastScannedBarcode: string) => {
  //   const [materialNumber, batch, quantityString] =
  //     lastScannedBarcode.split('-');
  //   const quantity = Number(quantityString.replace(',', '.'));

  //   const validity = await fetchBatchData(
  //     materialNumber,
  //     batch,
  //     storageLocationIn,
  //   );

  //   if (lastScannedBarcode !== '') {
  //     if (scannedLabels.length > 0) {
  //       setScannedLabels([
  //         ...scannedLabels,
  //         {
  //           count: scannedLabels[scannedLabels.length - 1].count + 1,
  //           materialNumber: materialNumber,
  //           batch: batch,
  //           quantity: quantity,
  //           validity: validity,
  //         },
  //       ]);
  //     } else {
  //       setScannedLabels([
  //         {
  //           count: 1,
  //           materialNumber: materialNumber,
  //           batch: batch,
  //           quantity: quantity,
  //           validity: validity,
  //         },
  //       ]);
  //     }
  //   }
  // };

  const storageLocationIsValid = (stgLoc: string) => {
    return true;
  };

  const submitGoodsMovement = (
    labels: Label[],
    stgLocIn: string,
    stgLocOut: string,
  ) => {
    const submitGoodsMovement = async (
      labels: Label[],
      stgLoc: string,
    ): Promise<MaterialDocument | undefined> => {
      if (storageLocationIsValid(stgLoc)) {
        const materialDocument = await Repository.createGoodsMovement(
          GOODS_MOVEMENT_CODE.GOODS_ISSUE,
          labels,
          stgLocIn,
          stgLocOut,
          MOVEMENT_TYPE.GOODS_ISSUE,
          productionOrder,
        );

        // resetScreenComponents();

        return materialDocument;
      } else {
        Alert.alert('Σφάλμα', 'Εισάγετε αποθηκευτικό χώρο');
      }
    };

    if (labels.length > 0) {
      return submitGoodsMovement(labels, stgLocIn);
    } else {
      Alert.alert('Σφάλμα', 'Αδειο παραστατικό');
    }
  };

  //TODO: storage location list tab, my goods issues tab

  return (
    <View style={styles(theme).topContainer}>
      <View style={styles(theme).productionOrderInputContainer}>
        <Text style={styles(theme).productionOrderInputText}>
          Εντολή Παραγωγής:{' '}
        </Text>
        <TextInput
          style={styles(theme).productionOrderInputField}
          keyboardType="number-pad"
          onChangeText={productionOrder => setProductionOrder(productionOrder)}
          onSubmitEditing={() => {
            getProductionOrderData();
          }}
          value={productionOrder}></TextInput>
      </View>

      <View style={styles(theme).productionOrderContainer}>
        <View style={styles(theme).productionOrderHeaderContainer}>
          <View style={styles(theme).productionOrderHeaderItem}>
            <Text style={styles(theme).productionOrderHeaderTextLeft}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Παραγωγή</Text>
              {'                 '}
              {productionOrderData?.header.productionOrderMaterialText}
              {'\n'}
              {productionOrderData?.header.scheduledStartDate.toLocaleString()}
              {'\n'}
              {productionOrderData?.header.workCenterDescription}
            </Text>
          </View>

          <View style={styles(theme).productionOrderHeaderItem}>
            <Text style={styles(theme).productionOrderHeaderTextRight}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Παραγγελία</Text>
              {'                 '}
              {productionOrderData?.header.customerName}
              {'\n'}
              {productionOrderData?.header.associatedSalesOrder.replace(
                /^0+/,
                '',
              )}
              /{productionOrderData?.header.associatedSalesOrderItem}
            </Text>
          </View>
        </View>

        {productionOrderData !== undefined ? (
          <Text
            style={[
              styles(theme).productionOrderStatusText,
              {
                color:
                  productionOrderData.header.confirmedYield >=
                  productionOrderData.header.targetQuantity
                    ? '#C17161'
                    : '#94BA78',
              },
            ]}>
            Παραγόμενο/Στόχος: {productionOrderData.header.confirmedYield}/
            {productionOrderData.header.targetQuantity}{' '}
            {productionOrderData.header.unitOfMeasure}
          </Text>
        ) : null}
      </View>

      <FlatList
        style={styles(theme).goodsIssuesContainer}
        data={[
          olivesGroup,
          secondaryMaterialsGroup,
          packagingGroup,
          byProductsGroup,
        ]}
        renderItem={({item, index}) => (
          <View style={{margin: '2%'}}>
            {index === 0 ? (
              <Text style={styles(theme).componentCategory}>Ελιές</Text>
            ) : index === 1 ? (
              <Text style={styles(theme).componentCategory}>Β' Ύλες</Text>
            ) : index === 2 ? (
              <Text style={styles(theme).componentCategory}>
                Υλικά Συσκευασίας{' '}
              </Text>
            ) : (
              <Text style={styles(theme).componentCategory}>Υποπροϊόντα</Text>
            )}

            <FlatList
              data={item}
              renderItem={({item}) => (
                <View key={index} style={{flexDirection: 'row'}}>
                  <Text style={styles(theme).componentMaterialText}>
                    {item.materialText}
                  </Text>
                  <View style={styles(theme).componentQuantity}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                      }}>
                      {item.issuedQuantity.toString().replace('.', ',')}/
                      {item.requirementQuantity.toString().replace('.', ',')}
                      {item.unitOfMeasure}
                    </Text>
                  </View>
                </View>
              )}></FlatList>
          </View>
        )}></FlatList>

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            if (productionOrder !== '') {
              addLabel(lastScannedBarcode);
            }
          }}
          validator={lastScannedBarcode =>
            BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
          }
        />
      </View>
    </View>
  );
}

export default React.memo(GoodsIssues);
