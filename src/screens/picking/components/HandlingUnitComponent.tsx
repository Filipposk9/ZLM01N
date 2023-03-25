import React, {useContext, useEffect, useState} from 'react';
import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import VerticalSlide from '../../../appearance/animations/VerticalSlide';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import {HandlingUnit} from '../../../shared/Types';

interface HandlingUnitComponentProps {
  scannedHandlingUnits: HandlingUnit[];
}

function HandlingUnitComponent(props: HandlingUnitComponentProps): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const animation = VerticalSlide;

  const {scannedHandlingUnits} = props;

  return (
    <Animated.View style={animation.setInterpolate(0)}>
      <FlatList
        data={scannedHandlingUnits}
        renderItem={({item}) => {
          //TODO: make into 1 component
          return (
            <View style={styles(theme).outboundDeliveryHandlingUnitsContainer}>
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
        }}></FlatList>
    </Animated.View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    outboundDeliveryHandlingUnitsContainer: {
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      marginBottom: '2%',
    },
    outboundDeliveryHandlingUnitsText: {
      color: theme.buttonTextColor,
      marginLeft: '4%',
    },
  });
export default HandlingUnitComponent;
