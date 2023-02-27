import React, {Component} from 'react';
import {View, Text, Animated, Pressable, Easing} from 'react-native';

import {styles} from '../styles/TransferPostingHistoryStyles';

import {ThemeContext} from '../styles/ThemeContext';

class TransferPostingHistoryItem extends Component {
  static contextType = ThemeContext;
  static counter = 0;

  lineItems = this.props.goodsMovementLog.lineItems;

  constructor(props) {
    super(props);

    this.state = {
      maxHeight: 0,
    };

    this.count = ++TransferPostingHistoryItem.counter;
  }

  animatedValue = new Animated.Value(0);
  dropDown = false;

  initMaxHeightInterpolation() {
    this.setState({
      maxHeight: this.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }),
    });
  }

  slideDown = () => {
    this.initMaxHeightInterpolation();
    Animated.timing(this.animatedValue, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      this.dropdown = true;
    });
  };

  slideUp = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      this.dropdown = false;
    });
  };

  componentDidMount() {
    this.initMaxHeightInterpolation();
  }

  componentWillUnmount() {
    TransferPostingHistoryItem.counter = 0;
  }

  render() {
    return (
      <Pressable
        onPress={() => {
          if (!this.dropdown) {
            this.slideDown();
          } else {
            this.slideUp();
          }
        }}>
        <Animated.View
          style={
            this.mblnr
              ? styles(this.context.theme).transferPostingHistoryItemSuccess
              : styles(this.context.theme).transferPostingHistoryItemFailure
          }>
          <Text
            style={styles(this.context.theme).transferPostingHistoryItemText}>
            {this.count}. Παραστατικό Υλικού: {this.mblnr}
          </Text>
          <Text
            style={styles(this.context.theme).transferPostingHistoryItemText}>
            Προέλευση: {this.lgortIn}
          </Text>
          <Text
            style={styles(this.context.theme).transferPostingHistoryItemText}>
            Προορισμός: {this.lgortOut}
          </Text>

          {this.lineItems.map((itemKey, i) => {
            return (
              <Animated.View style={{maxHeight: this.state.maxHeight}} key={i}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={
                      styles(this.context.theme).transferPostingHistoryItemText
                    }>
                    Υλικό:{' '}
                  </Text>
                  <Text>{itemKey.matnr}</Text>
                </View>
                <Text
                  style={
                    styles(this.context.theme).transferPostingHistoryItemMaktx
                  }>
                  {itemKey.maktx}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={
                      styles(this.context.theme).transferPostingHistoryItemText
                    }>
                    Παρτίδα:
                  </Text>
                  <Text> {itemKey.charg}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={
                      styles(this.context.theme).transferPostingHistoryItemText
                    }>
                    Ποσότητα:
                  </Text>
                  <Text> {itemKey.menge}</Text>
                </View>
                <Text></Text>
              </Animated.View>
            );
          })}
        </Animated.View>
      </Pressable>
    );
  }
}

export default TransferPostingHistoryItem;
