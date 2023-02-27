import React, {Component, useRef, createRef} from 'react';
import {View, Text, Pressable, FlatList, LayoutAnimation} from 'react-native';

import {styles} from '../styles/PickingStyles';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ThemeContext} from '../styles/ThemeContext';

class OutboundDelivery extends Component {
  static contextType = ThemeContext;

  lineItems = new Array();

  constructor(props) {
    super(props);

    this.state = {
      expanded: [],
    };

    this.header = new OutboundDeliveryHeader(this.props.data.HEADER);

    props.data.ITEMS.map((item, i) => {
      this.lineItems.push(new OutboundDeliveryItem(item));
      this.state.expanded.push(false);
    });
  }

  onChangeLayout(i) {
    const currentState = this.state.expanded;

    if (currentState[i]) {
      currentState[i] = false;
    } else {
      currentState[i] = true;
    }

    this.setState({expanded: currentState});
  }

  render() {
    return (
      <View style={styles(this.context.theme).outboundDeliveryContainer}>
        <Text style={styles(this.context.theme).outboundDeliveryHeaderText}>
          Πελάτης: {this.header.soldToParty}
        </Text>
        <Text style={styles(this.context.theme).outboundDeliveryHeaderText}>
          Προορισμός: {this.header.shipToParty}
        </Text>
        <Text
          style={[
            styles(this.context.theme).outboundDeliveryHeaderText,
            this.header.pickingStatus === 'C'
              ? {color: 'red'}
              : {color: this.context.theme.buttonTextColor},
          ]}>
          Picking Status: {this.header.pickingStatus}
        </Text>

        <View style={styles(this.context.theme).outboundDeliveryLinesContainer}>
          <FlatList
            data={this.lineItems}
            renderItem={({item, index}) => (
              <View>
                <Pressable onPress={this.onChangeLayout.bind(this, index)}>
                  <Text
                    style={
                      styles(this.context.theme).outboundDeliveryLinesText
                    }>
                    {item.positionNumber}. {item.materialText}
                  </Text>
                  <Text
                    style={
                      styles(this.context.theme).outboundDeliveryLinesText
                    }>
                    Picked: {item.pickedQuantity}/{item.requirementQuantity}
                    {item.unitOfMeasure}
                  </Text>
                  <Text
                    style={
                      styles(this.context.theme).outboundDeliveryLinesText
                    }>
                    Scanned: {item.palletsPicked} PAL
                  </Text>
                </Pressable>
                <View
                  style={{
                    height: this.state.expanded[index] ? null : 0,
                    overflow: 'hidden',
                  }}>
                  <FlatList
                    data={item.handlingUnits}
                    renderItem={({item}) => (
                      <View
                        style={
                          styles(this.context.theme)
                            .outboundDeliveryHandlingUnitsContainer
                        }>
                        <Text
                          style={
                            styles(this.context.theme)
                              .outboundDeliveryHandlingUnitsText
                          }>
                          SSCC: {item.EXIDV}
                        </Text>
                        <Text
                          style={
                            styles(this.context.theme)
                              .outboundDeliveryHandlingUnitsText
                          }>
                          Παρτίδα: {item.CHARG}
                        </Text>
                        <Text
                          style={
                            styles(this.context.theme)
                              .outboundDeliveryHandlingUnitsText
                          }>
                          Ποσότητα: {item.VEMNG} {item.VEMEH}
                        </Text>
                        <Text
                          style={
                            styles(this.context.theme)
                              .outboundDeliveryHandlingUnitsText
                          }>
                          Αποθ. Χώρος: {item.LGORT}
                        </Text>
                      </View>
                    )}></FlatList>
                </View>
              </View>
            )}></FlatList>
        </View>
      </View>
    );
  }
}

class OutboundDeliveryHeader {
  constructor(data) {
    this.deliveryNumber = data.VBELN;
    this.soldToParty = data.NAME1;
    this.shipToParty = data.NAME2;
    this.pickingStatus = data.KOSTK;
  }
}

class OutboundDeliveryItem {
  constructor(data) {
    this.materialNumber = data.MATNR;
    this.positionNumber = data.POSNR;
    this.materialText = data.MAKTX;
    this.pickedQuantity = data.RFMNG;
    this.requirementQuantity = data.ORMNG;
    this.unitOfMeasure = data.VRKME;
    this.handlingUnits = data.HU;
    this.palletsPicked = data.HU.length;
  }
}

export default OutboundDelivery;
