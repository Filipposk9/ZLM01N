import React, {useContext, useEffect, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import VerticalSlide from '../../../appearance/animations/VerticalSlide';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import Repository from '../../../data/Repository';
import {MaterialDocument, MaterialDocumentItem} from '../../../shared/Types';

interface HistoryItemProps {
  goodsMovementLog: MaterialDocument;
  count: number;
}

function HistoryItem(props: HistoryItemProps): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const {goodsMovementLog, count} = props;

  const animation = VerticalSlide;

  type HashedDescriptions = {[key: string]: string};

  const [materialDescriptions, setMaterialDescriptions] =
    useState<HashedDescriptions>({});
  const [storageLocations, setStorageLocations] = useState<HashedDescriptions>(
    {},
  );

  const getMaterialDescriptions = async () => {
    const materialNumbers: {[key: string]: boolean} = {};

    goodsMovementLog.items.forEach((item: MaterialDocumentItem) => {
      materialNumbers[item.materialNumber] = true;
    });

    const uniqueMaterialNumbers = Object.keys(materialNumbers);

    const hasheDescriptions: {[key: string]: string} = {};

    for (const materialNumber of uniqueMaterialNumbers) {
      const material = await Repository.getMaterialBasicData(materialNumber);

      if (material !== undefined) {
        hasheDescriptions[materialNumber] = material.description;
      }
    }

    setMaterialDescriptions(hasheDescriptions);
  };

  const getStorageLocations = async () => {
    const storageLocations = await Repository.getStorageLocations();

    const hashedStorageLocations: {[key: string]: string} = {};

    for (const storageLocation of storageLocations) {
      hashedStorageLocations[storageLocation.storageLocation] =
        storageLocation.description;
    }

    setStorageLocations(hashedStorageLocations);
  };

  useEffect(() => {
    getMaterialDescriptions();
    getStorageLocations();
  }, []);

  return (
    <Pressable
      onPress={() => {
        animation.setInterpolate(goodsMovementLog.items.length * 100);
      }}>
      <View
        style={[
          styles(theme).historyItem,
          {
            backgroundColor: goodsMovementLog.materialDocumentNumber
              ? theme.foregroundColor
              : theme.secondaryForegroundColor,
          },
        ]}>
        <View style={styles(theme).historyItemTopPanel}>
          <View style={styles(theme).historyItemLeftPanel}>
            <Text style={styles(theme).historyItemLeftPanelText}>{count}</Text>
          </View>
          <View>
            <Text style={styles(theme).historyItemHeaderContainer}>
              <Text style={styles(theme).historyItemHeaderText}>
                Ενδοδιακίνηση:{' '}
              </Text>
              <Text style={styles(theme).historyItemHeaderText2}>
                {goodsMovementLog.materialDocumentNumber}
              </Text>
            </Text>
            <Text style={styles(theme).historyItemHeaderContainer2}>
              <Text style={styles(theme).historyItemHeaderText3}>
                Προέλευση:{' '}
              </Text>
              <Text style={styles(theme).historyItemHeaderText4}>
                {goodsMovementLog.items[0].storageLocationIn}{' '}
                {storageLocations[goodsMovementLog.items[0].storageLocationIn]}
              </Text>
            </Text>
            <Text style={styles(theme).historyItemHeaderContainer2}>
              <Text style={styles(theme).historyItemHeaderText3}>
                Προορισμός:{' '}
              </Text>
              <Text style={styles(theme).historyItemHeaderText4}>
                {goodsMovementLog.items[0].storageLocationOut}{' '}
                {storageLocations[goodsMovementLog.items[0].storageLocationOut]}
              </Text>
            </Text>
          </View>
        </View>

        <Animated.View style={animation.setInterpolate(0)}>
          {goodsMovementLog.items.map(
            (goodsMovementLog: MaterialDocumentItem, j: number) => {
              return (
                <View
                  style={{
                    marginLeft: '16%',
                    marginTop: '1%',
                  }}
                  key={j++}>
                  <Text style={styles(theme).historyItemLineText}>
                    Υλικό: {goodsMovementLog.materialNumber}
                    {'\n'}
                    {materialDescriptions[goodsMovementLog.materialNumber]}
                  </Text>
                  <Text style={styles(theme).historyItemLineText}>
                    Παρτίδα: {goodsMovementLog.batch}
                  </Text>
                  <Text style={styles(theme).historyItemLineText}>
                    Ποσότητα: {goodsMovementLog.quantity}
                    {'\n'}
                  </Text>
                </View>
              );
            },
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    historyItem: {
      elevation: 5,
      borderRadius: 10,
      margin: '2%',
    },
    historyHeaderText: {
      fontWeight: 'bold',
      fontSize: 30,
      color: theme.textColor,
    },
    historyItemTopPanel: {
      flexDirection: 'row',
    },
    historyItemIcon: {
      alignItems: 'center',
    },
    historyItemLeftPanel: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '16%',
    },
    historyItemLeftPanelText: {
      color: theme.buttonTextColor,
      fontSize: 30,
      fontWeight: 'bold',
    },
    historyItemHeaderContainer: {
      marginLeft: '4%',
      marginTop: '2%',
    },
    historyItemHeaderContainer2: {
      marginLeft: '4%',
    },
    historyItemHeaderText: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    historyItemHeaderText2: {
      color: theme.buttonTextColor,
      fontSize: 18,
    },
    historyItemHeaderText3: {
      color: theme.buttonTextColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
    historyItemHeaderText4: {
      color: theme.buttonTextColor,
      fontSize: 18,
    },
    historyItemLineText: {
      marginLeft: '4%',
      color: theme.buttonTextColor,
    },
    historyItemMaktx: {
      marginLeft: '4%',
    },
  });

export default HistoryItem;
