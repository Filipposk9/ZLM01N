import React, {useContext, useRef, useState} from 'react';
import {View, Text, TextInput, Alert, ScrollView} from 'react-native';
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
import LabelComponent from '../transferposting/components/LabelComponent';
import {GOODS_MOVEMENT_CODE, MOVEMENT_TYPE} from '../../shared/Constants';

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

  const addLabel = (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      if (scannedLabels !== undefined) {
        setScannedLabels([
          ...scannedLabels,
          {
            count: scannedLabels.length + 1,
            materialNumber: lastScannedBarcode.split('-')[0],
            batch: lastScannedBarcode.split('-')[1],
            quantity: Number(
              lastScannedBarcode.split('-')[2].replace(',', '.'),
            ),
            validity: false,
          },
        ]);
      } else {
        setScannedLabels([
          {
            count: 1,
            materialNumber: lastScannedBarcode.split('-')[0],
            batch: lastScannedBarcode.split('-')[1],
            quantity: Number(
              lastScannedBarcode.split('-')[2].replace(',', '.'),
            ),
            validity: false,
          },
        ]);
      }
    }
  };

  const submitGoodsMovement = (
    scannedLabels: Label[],
    storageLocationIn: string,
    storageLocationOut: string,
  ) => {
    const submitGoodsMovement = async (): Promise<
      MaterialDocument | undefined
    > => {
      const materialDocument = await Repository.createGoodsMovement(
        GOODS_MOVEMENT_CODE.GOODS_ISSUE,
        scannedLabels,
        //TODO: ask user for storage location or get from BOM?
        storageLocationIn,
        storageLocationOut,
        MOVEMENT_TYPE.GOODS_ISSUE,
        productionOrder,
      );

      return materialDocument;
    };

    // if (storageLocationsAreValid()) {
    if (scannedLabels.length > 0) {
      return submitGoodsMovement();
    } else {
      Alert.alert('Άδειο παραστατικό');
      return undefined;
    }
    // } else {
    //   Alert.alert('Εισάγετε αποθηκευτικό χώρο');
    //   return undefined;
    // }
  };

  const removeLabel = (i: number): void => {};

  //TODO: storage location list tab, my goods issues tab

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

          {/* <Text>
            
            <Text style={styles(theme).productionOrderHeaderText}>
              Παραγόμενο/Στόχος:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.confirmedYield}/
              {productionOrderData?.header.targetQuantity}{' '}
              {productionOrderData?.header.unitOfMeasure}
            </Text>
          </Text> */}
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
            Παραγόμενο/Στόχος:
            {productionOrderData.header.confirmedYield}/
            {productionOrderData.header.targetQuantity}
          </Text>
        ) : null}

        <FlatList
          data={[
            olivesGroup,
            secondaryMaterialsGroup,
            packagingGroup,
            byProductsGroup,
          ]}
          renderItem={({item, index}) => (
            <View>
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
      </View>

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => addLabel(lastScannedBarcode)}
          filter={lastScanendBarcode => materialLabelFilter(lastScanendBarcode)}
        />
      </View>
    </View>
  );
}

export default React.memo(GoodsIssues);
