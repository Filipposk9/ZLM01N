import React, {useContext, useRef, useState} from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
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
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import {useAppDispatch} from '../../redux/Store';
import {setGoodsMovementLog} from '../../redux/actions/GoodsMovementLogActions';

function GoodsIssues({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const dispatch = useAppDispatch();

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
    useState<boolean>(false);
  const [manualLabelInputEditability, setManualLabelInputEditability] =
    useState<boolean>(false);

  const [lastScannedBarcode, setLastScannedBarcode] = useState<string>('');

  const [productionOrderEditability, setProductionOrderEditability] =
    useState<boolean>(true);

  const [materialText, setMaterialText] = useState<string>('');
  const [materialNumberText, setMaterialNumberText] = useState<string>('');
  const [batchText, setBatchText] = useState<string>('');
  const [quantityText, setQuantityText] = useState<string>('');

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
  };

  const setModalFields = (barcode: string) => {
    const setModalFields = async (barcode: string) => {
      if (barcode) {
        const [materialNumber, batch, quantity] = barcode.split('-');

        const materialText = await getMaterialText(materialNumber);
        if (materialText !== undefined) {
          setMaterialText(materialText);
        }

        setMaterialNumberText(materialNumber);
        setBatchText(batch);
        setQuantityText(quantity);

        setManualLabelInputVisibility(true);
      }
    };

    setModalFields(barcode);
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

  const confirmGoodsIssue = (lastScannedBarcode: string) => {
    const confirmGoodsIssue = async (lastScannedBarcode: string) => {
      if (lastScannedBarcode !== '') {
        const [materialNumber, batch, quantityString] =
          lastScannedBarcode.split('-');

        const quantity = Number(quantityString.replace(',', '.'));

        const component = productionOrderData?.components.find(item => {
          const matnr = Number(item.materialNumber);
          return matnr === Number(materialNumber);
        });

        setIsLoading(true);

        const goodsMovementLog = await submitGoodsMovement(
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

        if (goodsMovementLog !== undefined) {
          dispatch(setGoodsMovementLog(goodsMovementLog));
          getProductionOrderData();
        }

        setIsLoading(false);

        if (goodsMovementLog?.items[0].iserror) {
          Alert.alert(
            'Η ανάλωση δεν πραγματοποιήθηκε',
            'Το σφάλμα έχει αποσταλεί στο γραφείο παραγωγής',
          );
        } else {
          Alert.alert('Επιτυχής ανάλωση');
        }
      }
    };

    confirmGoodsIssue(lastScannedBarcode);
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

  return (
    <View style={styles(theme).topContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Ανάλωση...'}
        textStyle={{color: 'white'}}></Spinner>
      <View
        style={styles(theme).productionOrderInputContainer}
        onTouchStart={() => {
          setProductionOrderEditability(true);
        }}>
        <Text style={styles(theme).productionOrderInputText}>
          Εντολή Παραγωγής:{' '}
        </Text>
        <TextInput
          style={styles(theme).productionOrderInputField}
          editable={productionOrderEditability}
          keyboardType="number-pad"
          onChangeText={productionOrder => setProductionOrder(productionOrder)}
          onSubmitEditing={() => {
            getProductionOrderData();
            setProductionOrderEditability(false);
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

      <View style={styles(theme).manualLabelInputButtonContainer}>
        <Pressable
          style={styles(theme).manualLabelInputButton}
          onPress={async () => {
            setManualLabelInputEditability(true);
            setManualLabelInputVisibility(true);
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).manualLabelInputButtonText}>
            Χειροκίνητη Καταχώριση
          </Text>
        </Pressable>
      </View>

      <ManualLabelInputModal
        headerText={materialText}
        materialNumberText={materialNumberText}
        batchText={batchText}
        quantityText={quantityText}
        buttonText={'Ανάλωση'}
        editable={manualLabelInputEditability}
        visibility={manualLabelInputVisibility}
        onSubmit={(lastScannedBarcode: string) => {
          confirmGoodsIssue(lastScannedBarcode);
          setManualLabelInputVisibility(false);
          setManualLabelInputEditability(false);
          setMaterialText('');
        }}
      />

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            if (
              productionOrder !== '' &&
              productionOrderData?.header.status !== 'I0045'
            ) {
              setLastScannedBarcode(lastScannedBarcode);
              setModalFields(lastScannedBarcode);
            } else {
              if (productionOrder === '') {
                Alert.alert('Παρακαλώ εισάγετε εντολή παραγωγής');
              } else {
                Alert.alert('Η Εντολή παραγωγής έχει ήδη ολοκληρωθεί');
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
