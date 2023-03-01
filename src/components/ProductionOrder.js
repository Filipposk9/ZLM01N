import React, {Component, createRef} from 'react';

import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Keyboard,
} from 'react-native';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/AntDesign';

import {styles} from '../styles/GoodsIssuesStyles';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ThemeContext} from '../styles/ThemeContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

class ProductionOrder extends Component {
  static contextType = ThemeContext;

  lineItems = new Array();

  scrollViewRef = createRef();
  yOffset = 0;

  constructor(props) {
    super(props);

    this.state = {
      itemsReachedEnd: false,
      elementScanned: [],
      modalVisibility: false,
      goodsIssueStorageLocation: '',
      goodsIssued: null,
      lastScannedLabel: '',
    };

    this.header = new ProductionOrderHeader(this.props.data.HEADER);

    props.data.COMPONENTS.map((item, i) => {
      this.lineItems.push(new ProductionOrderItem(item));
    });

    handleGoodsIssued = props.onGoodsIssued;
  }

  //TODO: materialGroupExists()

  materialGroupExists() {}

  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  }

  isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
    return contentOffset.y == 0;
  }

  scrollViewSizeChanged(height, barcode) {
    let splitBarcode, matnr, charg, menge;
    if (barcode !== null && barcode !== undefined) {
      splitBarcode = barcode.split('-');
      matnr = splitBarcode[0];
      charg = splitBarcode[1];
      menge = splitBarcode[2];
    }

    if (height !== 0) {
      let elementIndex = height / 30;

      const currentState = this.state.elementScanned;

      currentState[elementIndex] = true;

      //TODO: if not in BOM, get text from collection

      this.setState({elementsScanned: currentState});
      this.setState({modalVisibility: true});
      this.setState({
        scannedMaterialText: this.lineItems[elementIndex].componentMaterialText,
        scannedMaterialNumber: matnr,
        scannedMaterialBatch: charg,
        scannedMaterialQuantity: menge,
      });
    }
    this.scrollViewRef.current.scrollTo({y: height, animated: true});
  }

  render() {
    return (
      <View>
        <View style={styles(this.context.theme).productionOrderContainer}>
          <View
            style={styles(this.context.theme).productionOrderHeaderContainer}>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Παραγόμενο:{' '}
              </Text>
              <Text>{this.header.orderMaterial}</Text>
            </Text>
            <Text>{this.header.orderMaterialText}</Text>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Πελάτης:{' '}
              </Text>
              <Text>{this.header.customer}</Text>
            </Text>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Παραγγελία:{' '}
              </Text>
              <Text>{this.header.salesOrder}</Text>
            </Text>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Ημερομηνία Εντολής:{' '}
              </Text>
              <Text>{this.header.orderDate}</Text>
            </Text>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Κέντρο Εργασίας:{' '}
              </Text>
              <Text>{this.header.productionLine}</Text>
            </Text>
            <Text>
              <Text
                style={styles(this.context.theme).productionOrderHeaderText}>
                Παραγόμενο/Στόχος:{' '}
              </Text>
              <Text>
                {this.header.orderYield}/{this.header.orderQuantity}{' '}
                {this.header.orderMaterialUnitOfMeasure}
              </Text>
            </Text>
          </View>

          <ScrollView
            ref={this.scrollViewRef}
            onContentSizeChange={(width, height) => {
              this.scrollViewSizeChanged(0);
            }}
            onScroll={({nativeEvent}) => {
              if (this.isCloseToTop(nativeEvent)) {
                this.setState({itemsReachedEnd: false});
              }
              if (this.isCloseToBottom(nativeEvent)) {
                this.setState({itemsReachedEnd: true});
              }
              this.yOffset = nativeEvent.contentOffset.y;
            }}>
            {this.lineItems.find(item => {
              return item.materialGroup.substr(0, 2) === '01';
            }) !== undefined ? (
              <Text style={styles(this.context.theme).componentCategory}>
                Ελιές
              </Text>
            ) : null}

            {this.lineItems.map((item, index) => {
              this.state.elementScanned.push(false);
              if (
                item.materialGroup.substr(0, 2) === '01' &&
                item.componentMovementType === '261'
              ) {
                return (
                  <View
                    key={index}
                    style={[
                      {flexDirection: 'row'},
                      this.state.elementScanned[index]
                        ? {borderWidth: 1, borderRadius: 10, borderColor: 'red'}
                        : {borderWidth: 0, borderRadius: 0},
                    ]}>
                    <Text
                      style={styles(this.context.theme).componentMaterialText}>
                      {item.componentMaterialText}
                    </Text>
                    <View style={styles(this.context.theme).componentQuantity}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>
                        {item.componentIssuedQuantity
                          .toString()
                          .replace('.', ',')}
                        /{item.componentQuantity.toString().replace('.', ',')}
                        {item.componentUnitOfMeasure}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}

            {this.lineItems.find(item => {
              return item.materialGroup.substr(0, 2) === '06';
            }) !== undefined ? (
              <Text style={styles(this.context.theme).componentCategory}>
                Υλικά Συσκευασίας
              </Text>
            ) : null}

            {this.lineItems.map((item, index) => {
              this.state.elementScanned.push(false);
              if (
                item.materialGroup.substr(0, 2) === '06' &&
                item.componentMovementType === '261'
              ) {
                return (
                  <View
                    key={index}
                    style={[
                      {flexDirection: 'row'},
                      this.state.elementScanned[index]
                        ? {borderWidth: 1, borderRadius: 10, borderColor: 'red'}
                        : {borderWidth: 0, borderRadius: 0},
                    ]}>
                    <Text
                      style={styles(this.context.theme).componentMaterialText}>
                      {item.componentMaterialText}
                    </Text>
                    <View style={styles(this.context.theme).componentQuantity}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>
                        {item.componentIssuedQuantity
                          .toString()
                          .replace('.', ',')}
                        /{item.componentQuantity.toString().replace('.', ',')}{' '}
                        {item.componentUnitOfMeasure}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}

            {this.lineItems.find(item => {
              return (
                item.materialGroup.substr(0, 2) === '02' ||
                item.materialGroup.substr(0, 2) === '03' ||
                item.materialGroup.substr(0, 2) === '04' ||
                item.materialGroup.substr(0, 2) === '05'
              );
            }) !== undefined ? (
              <Text style={styles(this.context.theme).componentCategory}>
                Β' Ύλες
              </Text>
            ) : null}

            {this.lineItems.map((item, index) => {
              this.state.elementScanned.push(false);
              if (
                (item.materialGroup.substr(0, 2) === '05' ||
                  item.materialGroup.substr(0, 2) === '03' ||
                  item.materialGroup.substr(0, 2) === '04' ||
                  item.materialGroup.substr(0, 2) === '05') &&
                item.componentMovementType === '261'
              ) {
                return (
                  <View
                    key={index}
                    style={[
                      {flexDirection: 'row'},
                      this.state.elementScanned[index]
                        ? {borderWidth: 1, borderRadius: 10, borderColor: 'red'}
                        : {borderWidth: 0, borderRadius: 0},
                    ]}>
                    <Text
                      style={styles(this.context.theme).componentMaterialText}>
                      {item.componentMaterialText}
                    </Text>
                    <View style={styles(this.context.theme).componentQuantity}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>
                        {item.componentIssuedQuantity
                          .toString()
                          .replace('.', ',')}
                        /{item.componentQuantity.toString().replace('.', ',')}{' '}
                        {item.componentUnitOfMeasure}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}

            {this.lineItems.find(item => {
              return item.componentMovementType === '531';
            }) !== undefined ? (
              <Text style={styles(this.context.theme).componentCategory}>
                Υποπροϊόντα
              </Text>
            ) : null}

            {this.lineItems.map((item, index) => {
              this.state.elementScanned.push(false);
              if (item.componentMovementType === '531') {
                return (
                  <View
                    key={index}
                    style={[
                      {flexDirection: 'row'},
                      this.state.elementScanned[index]
                        ? {borderWidth: 1, borderRadius: 10, borderColor: 'red'}
                        : {borderWidth: 0, borderRadius: 0},
                    ]}>
                    <Text
                      style={styles(this.context.theme).componentMaterialText}>
                      {item.componentMaterialText}
                    </Text>
                    <View style={styles(this.context.theme).componentQuantity}>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>
                        {item.componentIssuedQuantity
                          .toString()
                          .replace('.', ',')}
                        /{item.componentQuantity.toString().replace('.', ',')}{' '}
                        {item.componentUnitOfMeasure}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
          </ScrollView>
          <Pressable
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
              <Icon
                name={this.state.itemsReachedEnd ? 'up' : 'down'}
                size={30}
              />
            </View>
          </Pressable>

          <Modal
            isVisible={this.state.modalVisibility}
            onBackdropPress={() => {
              this.setState({modalVisibility: false});
              Keyboard.dismiss();
            }}
            animationIn={'fadeIn'}
            animationInTiming={1000}>
            <View style={styles(this.context.theme).scannedLabelPopup}>
              <Text style={styles(this.context.theme).scannedLabelHeader}>
                {this.state.scannedMaterialText}
              </Text>
              <Text style={styles(this.context.theme).scannedLabelText}>
                Κωδικός Υλικού: {this.state.scannedMaterialNumber}
              </Text>
              <Text style={styles(this.context.theme).scannedLabelText}>
                Παρτίδα: {this.state.scannedMaterialBatch}
              </Text>
              <Text style={styles(this.context.theme).scannedLabelText}>
                Ποσότητα: {this.state.scannedMaterialQuantity}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles(this.context.theme).scannedLabelText}
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
            <View style={styles(this.context.theme).scannedLabelButtonView}>
              <Pressable
                style={styles(this.context.theme).scannedLabelButton}
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
                <Text style={styles(this.context.theme).scannedLabelButtonText}>
                  Επιβεβαίωση
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

class ProductionOrderHeader {
  constructor(data) {
    this.orderNumber = data.AUFNR;
    this.orderDate = data.GSTRS;
    this.orderYield = data.IGMNG;
    this.orderQuantity = data.GAMNG;
    this.orderMaterial = data.PLNBEZ;
    this.orderMaterialText = data.MAKTX;
    this.orderMaterialUnitOfMeasure = data.PLNME;
    this.customer = data.NAME1;
    this.salesOrder = data.KDAUF;
    this.productionLine = data.KTEXT;
  }
}

class ProductionOrderItem {
  constructor(data) {
    this.componentMaterialNumber = data.MATNR;
    this.componentMaterialText = data.MAKTX;
    this.componentMovementType = data.BWART;
    this.componentPlant = data.WERKS;
    this.componentStorageLocation = data.LGORT;
    this.componentIssuedQuantity = data.MENGE;
    this.componentQuantity = data.ERFMG;
    this.componentUnitOfMeasure = data.ERFME;
    this.materialGroup = data.MATKL;
  }
}

export default ProductionOrder;
