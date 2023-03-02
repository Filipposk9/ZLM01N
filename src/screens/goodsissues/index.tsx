import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BarcodeScanner from '../../components/BarcodeScanner';
import Repository from '../../data/Repository';
import {ProductionOrder, ProductionOrderComponent} from '../../shared/Types';
import {GlobalStyles} from '../../styles/GlobalStyles';
import {styles} from '../../styles/GoodsIssuesStyles';
import {ThemeContext} from '../../styles/ThemeContext';

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

    if (scannerRef.current) {
      scannerRef.current.focus();
    }

    getProductionOrderData();
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

  // scrollViewRef = createRef();
  // yOffset = 0;

  // //TODO: materialGroupExists()

  // isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
  //   return (
  //     layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
  //   );
  // }

  // isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
  //   return contentOffset.y == 0;
  // }

  // scrollViewSizeChanged(height, barcode) {
  //   let splitBarcode, matnr, charg, menge;
  //   if (barcode !== null && barcode !== undefined) {
  //     splitBarcode = barcode.split('-');
  //     matnr = splitBarcode[0];
  //     charg = splitBarcode[1];
  //     menge = splitBarcode[2];
  //   }

  //   if (height !== 0) {
  //     let elementIndex = height / 30;

  //     const currentState = this.state.elementScanned;

  //     currentState[elementIndex] = true;

  //     //TODO: if not in BOM, get text from collection

  //     this.setState({elementsScanned: currentState});
  //     this.setState({modalVisibility: true});
  //     this.setState({
  //       scannedMaterialText: this.lineItems[elementIndex].componentMaterialText,
  //       scannedMaterialNumber: matnr,
  //       scannedMaterialBatch: charg,
  //       scannedMaterialQuantity: menge,
  //     });
  //   }
  //   this.scrollViewRef.current.scrollTo({y: height, animated: true});
  // }

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
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Παραγόμενο:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.productionOrderMaterial}
            </Text>
          </Text>
          <Text style={styles(theme).productionOrderHeaderContent}>
            {productionOrderData?.header.productionOrderMaterialText}
          </Text>
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Πελάτης:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.customerName}
            </Text>
          </Text>
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Παραγγελία:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.associatedSalesOrder}
            </Text>
          </Text>
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Ημερομηνία Εντολής:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.scheduledStartDate.toLocaleString()}
            </Text>
          </Text>
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Κέντρο Εργασίας:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.workCenterDescription}
            </Text>
          </Text>
          <Text>
            <Text style={styles(theme).productionOrderHeaderText}>
              Παραγόμενο/Στόχος:{' '}
            </Text>
            <Text style={styles(theme).productionOrderHeaderContent}>
              {productionOrderData?.header.confirmedYield}/
              {productionOrderData?.header.targetQuantity}{' '}
              {productionOrderData?.header.unitOfMeasure}
            </Text>
          </Text>
        </View>

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

        {/* <Pressable
          onPress={() => {
            this.scrollViewRef.current.scrollTo({
              y: this.state.itemsReachedEnd
                ? this.yOffset - 120
                : this.yOffset + 120,
              animated: true,
            });
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Icon name={this.state.itemsReachedEnd ? 'up' : 'down'} size={30} />
          </View>
        </Pressable> */}

        {/* <Modal
          isVisible={this.state.modalVisibility}
          onBackdropPress={() => {
            this.setState({modalVisibility: false});
            Keyboard.dismiss();
          }}
          animationIn={'fadeIn'}
          animationInTiming={1000}>
          <View style={styles(theme).scannedLabelPopup}>
            <Text style={styles(theme).scannedLabelHeader}>
              {this.state.scannedMaterialText}
            </Text>
            <Text style={styles(theme).scannedLabelText}>
              Κωδικός Υλικού: {this.state.scannedMaterialNumber}
            </Text>
            <Text style={styles(theme).scannedLabelText}>
              Παρτίδα: {this.state.scannedMaterialBatch}
            </Text>
            <Text style={styles(theme).scannedLabelText}>
              Ποσότητα: {this.state.scannedMaterialQuantity}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles(theme).scannedLabelText}
                keyboardType="numeric"
                placeholder={'Αποθ. Χώρος Ανάλωσης: '}
                placeholderTextColor={'grey'}
                onChangeText={storageLocation => {
                  this.setState({
                    goodsIssueStorageLocation: storageLocation,
                  });
                }}
                onSubmitEditing={async () => {
                  let response = await SapRequestHandler.getStorageLocations(
                    this.state.goodsIssueStorageLocation,
                  );

                  this.setState({
                    goodsIssueStorageLocationText: response[0].LGOBE,
                  });
                }}
                value={this.state.goodsIssueStorageLocation}></TextInput>
              <Text style={{marginTop: '5%'}}>
                {this.state.goodsIssueStorageLocationText}
              </Text>
            </View>
          </View>
          <View style={styles(theme).scannedLabelButtonView}>
            <Pressable
              style={styles(theme).scannedLabelButton}
              onPress={async () => {
                this.setState({
                  lastScannedLabel:
                    this.state.scannedMaterialNumber +
                    '-' +
                    this.state.scannedMaterialBatch +
                    '-' +
                    this.state.scannedMaterialQuantity,
                });
                this.setState({modalVisibility: false});
                Keyboard.dismiss();

                if (
                  this.state.goodsIssueStorageLocation !== null &&
                  this.state.goodsIssueStorageLocation !== undefined &&
                  this.state.goodsIssueStorageLocation !== ''
                  //FIXME: check label scanned isNull
                ) {
                  let label = [
                    {
                      count: 1,
                      matnr: this.state.scannedMaterialNumber,
                      charg: this.state.scannedMaterialBatch,
                      menge: this.state.scannedMaterialQuantity,
                      validity: true,
                      movetype: '261',
                      aufnr: this.header.orderNumber,
                    },
                  ];

                  let response = await SapRequestHandler.createGoodsMovement(
                    this.state.goodsIssueStorageLocation,
                    '',
                    label,
                    '03',
                  );

                  if (response[0].VALIDITY) {
                    this.setState({goodsIssued: true});
                  } else {
                    this.setState({goodsIssued: false});
                  }

                  if (this.state.goodsIssued) {
                    handleGoodsIssued(
                      this.state.lastScannedLabel + ' αναλώθηκε επιτυχώς',
                    );
                  }

                  this.setState({
                    scannedMaterialNumber: '',
                    scannedMaterialBatch: '',
                    scannedMaterialQuantity: 0,
                    scannedMaterialText: '',
                    goodsIssueStorageLocation: '',
                  });
                } else {
                  alert('Storage Location invalid');
                  //FIXME: determine storage location validity
                  //TODO: show storage location list
                }
              }}>
              <Text style={styles(theme).scannedLabelButtonText}>
                Επιβεβαίωση
              </Text>
            </Pressable>
          </View>
        </Modal> */}
      </View>

      {/* <View style={styles(theme).storageLocationListBtnView}>
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
      </View> */}

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
