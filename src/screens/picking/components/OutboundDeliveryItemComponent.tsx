import React, {useContext} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import VerticalSlide from '../../../appearance/animations/VerticalSlide';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import {OutboundDeliveryItem} from '../../../shared/Types';

interface OutboundDeliveryItemComponentProps {
  item: OutboundDeliveryItem;
}

function OutboundDeliveryItemComponent(
  props: OutboundDeliveryItemComponentProps,
): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const animation = new VerticalSlide();

  const {item} = props;

  return (
    <View style={styles(theme).outboundDeliveryLine}>
      <Pressable
        onPress={() => {
          animation.setInterpolate(100 * item.handlingUnits.length);
        }}>
        <View style={styles(theme).outboundDeliveryItem}>
          <View style={styles(theme).outboundDeliveryLineLeft}>
            <Text style={styles(theme).outboundDeliveryLineTextLeft}>
              {item.positionNumber}
            </Text>
          </View>
          <View style={styles(theme).outboundDeliveryLineRight}>
            <Text style={styles(theme).outboundDeliveryLineTextRight}>
              <Text>
                {item.materialText}
                {'\n'}
              </Text>
              <Text>
                Picked: {item.pickedQuantity}/{item.requirementQuantity}{' '}
                {item.unitOfMeasure}
                {'\n'}
              </Text>
              <Text>Scanned: {item.handlingUnits.length} PAL</Text>
            </Text>
          </View>
        </View>

        <Animated.View style={animation.setInterpolate(0)}>
          {item.handlingUnits.map((item, j) => {
            return (
              <View
                key={j++}
                style={styles(theme).outboundDeliveryHandlingUnitsContainer}>
                <Text style={styles(theme).outboundDeliveryHandlingUnitsText}>
                  SSCC: {item.sscc}
                </Text>
                <Text style={styles(theme).outboundDeliveryHandlingUnitsText}>
                  Παρτίδα: {item.batch}
                </Text>
                <Text style={styles(theme).outboundDeliveryHandlingUnitsText}>
                  Ποσότητα: {item.quantity} {item.unitOfMeasure}
                </Text>
                <Text style={styles(theme).outboundDeliveryHandlingUnitsText}>
                  Αποθ. Χώρος: {item.storageLocation}
                </Text>
              </View>
            );
          })}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    outboundDeliveryLine: {
      elevation: 4,
      backgroundColor: theme.foregroundColor,
      marginBottom: '2%',
      borderRadius: 10,
    },
    outboundDeliveryItem: {
      margin: '2%',
      flexDirection: 'row',
    },
    outboundDeliveryLineLeft: {
      justifyContent: 'center',
      marginLeft: '2%',
      width: '16%',
    },
    outboundDeliveryLineTextLeft: {
      color: theme.buttonTextColor,
      fontWeight: 'bold',
      fontSize: 32,
    },
    outboundDeliveryLineRight: {
      justifyContent: 'center',
      width: '84%',
      borderRadius: 10,
    },
    outboundDeliveryLineTextRight: {
      color: theme.buttonTextColor,
      width: '95%',
      margin: '2%',
    },
    outboundDeliveryHandlingUnitsContainer: {
      elevation: 5,
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 10,
      margin: '2%',
    },
    outboundDeliveryHandlingUnitsText: {
      color: theme.buttonTextColor,
      marginLeft: '4%',
    },
  });
export default OutboundDeliveryItemComponent;
