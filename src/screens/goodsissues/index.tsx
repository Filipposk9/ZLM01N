import React, {useContext, useRef, useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import ManualLabelInputModal from '../../utilities/components/ManualLabelInputModal';
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
import SapStructureValidator from '../../utilities/validators/SapStructureValidator';
import Spinner from 'react-native-loading-spinner-overlay/lib';

function GoodsIssues({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);
  const scannerRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const [manualLabelInputVisibility, setManualLabelInputVisibility] =
    useState(false);

  const [lastScannedBarcode, setLastScannedBarcode] = useState<string>(
    '210000590-23028F0000-1',
  );

  const [materialText, setMaterialText] = useState('');

  const getProductionOrderData = () => {
    const getProductionOrderData = async () => {
      if (SapStructureValidator.validateProductionOrder(productionOrder)) {
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
    setManualLabelInputVisibility(true);
  };

  const getMaterialText = (
    materialNumber: string,
  ): Promise<string | undefined> | undefined => {
    const getMaterialText = async (materialNumber: string) => {
      const response = await Repository.getMaterialBasicData(materialNumber);

      if (response !== undefined) {
        const materialText = response.description;
        return materialText;
      } else {
        return undefined;
      }
    };

    const materialText = getMaterialText(materialNumber);
    if (materialText) {
      return materialText;
    } else {
      return undefined;
    }
  };

  const submitGoodsMovement = (labels: Label[], stgLocIn: string) => {
    const submitGoodsMovement = async (
      labels: Label[],
      stgLocIn: string,
    ): Promise<MaterialDocument | undefined> => {
      const materialDocument = await Repository.createGoodsMovement(
        GOODS_MOVEMENT_CODE.GOODS_ISSUE,
        labels,
        stgLocIn,
        '',
        MOVEMENT_TYPE.GOODS_ISSUE,
        productionOrder,
      );

      return materialDocument;
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
      <Spinner
        visible={isLoading}
        textContent={'Ανάλωση...'}
        textStyle={{color: 'white'}}></Spinner>
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

      <ManualLabelInputModal
        headerText={materialText}
        materialNumberText={lastScannedBarcode.split('-')[0]}
        batchText={lastScannedBarcode.split('-')[1]}
        quantityText={lastScannedBarcode.split('-')[2]}
        buttonText={'Ανάλωση'}
        editable={false}
        visibility={manualLabelInputVisibility}
        onSubmit={async () => {
          setManualLabelInputVisibility(false);
          setIsLoading(true);
          const [materialNumber, batch, quantityString] =
            lastScannedBarcode.split('-');
          const quantity = Number(quantityString.replace(',', '.'));

          const component = productionOrderData?.components.find(item => {
            const matnr = Number(item.materialNumber);
            return matnr === Number(materialNumber);
          });

          const response = await submitGoodsMovement(
            [
              {
                count: 1,
                materialNumber: materialNumber,
                batch: batch,
                quantity: quantity,
                validity: true,
              },
            ],
            component?.storageLocation ? component.storageLocation : '',
          );

          if (response !== undefined) {
            console.log(response, 'RESPONSE');
          }
          setIsLoading(false);
        }}
      />

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            if (productionOrder !== '') {
              setLastScannedBarcode(lastScannedBarcode);
              if (lastScannedBarcode) {
                const materialText = getMaterialText(
                  lastScannedBarcode.split('-')[0],
                );
                setMaterialText(materialText);
                setManualLabelInputVisibility(true);
              }
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
