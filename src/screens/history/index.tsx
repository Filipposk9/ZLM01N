import React, {useContext, useState} from 'react';
import {View, Text, FlatList, Pressable, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../../appearance/styles/HistoryStyles';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import {GoodsMovementLogState} from '../../redux/ReduxTypes';
import {MaterialDocumentItem} from '../../shared/Types';

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLogs = useSelector(
    (state: GoodsMovementLogState) => state.goodsMovementLog,
  );

  let i = 0;
  let j = 0;

  // const animatedData = goodsMovementLogs.goodsMovementLog.map(() => ({
  //   height: new Animated.Value(100),
  // }));

  // const [expandedIndex, setExpandedIndex] = useState(-1);

  // const handlePress = (index: number) => {
  //   if (index === expandedIndex) {
  //     setExpandedIndex(-1);
  //   } else {
  //     setExpandedIndex(index);
  //   }
  // };

  // const animateItem = (index: number) => {
  //   const document = animatedData[index];
  //   console.log(animatedData[index].height);

  //   Animated.timing(animatedData[index].height, {
  //     toValue: animatedData[index].height === 0 ? 100 : 0,
  //     duration: 1500,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     console.log('a');
  //   });
  // };

  // initMaxHeightInterpolation() {
  //   this.setState({
  //     maxHeight: this.animatedValue.interpolate({
  //       inputRange: [0, 100],
  //       outputRange: ['0%', '100%'],
  //     }),
  //   });
  // }
  // animatedValue = new Animated.Value(0);
  // dropDown = false;
  // slideDown = () => {
  //   this.initMaxHeightInterpolation();
  //   Animated.timing(this.animatedValue, {
  //     toValue: 50,
  //     duration: 500,
  //     useNativeDriver: false,
  //     easing: Easing.linear,
  //   }).start(() => {
  //     this.dropdown = true;
  //   });
  // };

  return (
    <View style={styles(theme).historyContainer}>
      <View style={styles(theme).historyHeader}>
        <Text style={styles(theme).historyHeaderText}>
          Ιστορικό Ενδοδιακινήσεων
        </Text>
      </View>
      <FlatList
        data={goodsMovementLogs.goodsMovementLog}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              //handlePress(index);
              //animateItem(index);
            }}>
            <Animated.View
              style={
                item.materialNumber
                  ? styles(theme).historyItemSuccess
                  : styles(theme).historyItemFailure
              }>
              {item.items.map((item: MaterialDocumentItem) => (
                <View key={j++}>
                  <Text style={styles(theme).historyItemText}>
                    Κωδικός Υλικού: {item.materialNumber}
                  </Text>
                  <Text style={styles(theme).historyItemText}>
                    Παρτίδα: {item.batch}
                  </Text>
                  <Text style={styles(theme).historyItemText}>
                    Ποσότητα: {item.quantity}
                  </Text>
                </View>
              ))}
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default React.memo(History);
