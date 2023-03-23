import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../appearance/styles/HistoryStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import Repository from '../../data/Repository';
import {GoodsMovementLogState} from '../../redux/ReduxTypes';
import {MaterialDocument, MaterialDocumentItem} from '../../shared/Types';

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [expanded, setExpanded] = useState<boolean[]>([]);

  const goodsMovementLogs = useSelector((state: GoodsMovementLogState) =>
    state.goodsMovementLog.goodsMovementLog.slice().reverse(),
  );

  type HashedDescriptions = {[key: string]: string};

  const [materialDescriptions, setMaterialDescriptions] =
    useState<HashedDescriptions>({});
  const [storageLocations, setStorageLocations] = useState<HashedDescriptions>(
    {},
  );

  const getMaterialDescriptions = async () => {
    const materialNumbers: {[key: string]: boolean} = {};

    goodsMovementLogs.forEach((materialDocument: MaterialDocument) => {
      materialDocument.items.forEach(item => {
        materialNumbers[item.materialNumber] = true;
      });
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

  const onChangeLayout = (index: number) => {
    const nextState: boolean[] = expanded.map((c, i) => {
      if (i === index) {
        if (c) {
          return false;
        } else {
          return true;
        }
      } else {
        return null as unknown as boolean;
      }
    });

    if (nextState !== undefined) {
      setExpanded(nextState);
    }
  };

  return (
    <View style={styles(theme).historyContainer}>
      <View style={styles(theme).historyHeader}>
        <Text style={styles(theme).historyHeaderText}>Ιστορικό Κινήσεων</Text>
      </View>
      <FlatList
        data={goodsMovementLogs}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              onChangeLayout(index);
            }}>
            <View
              style={[
                styles(theme).historyItem,
                {
                  backgroundColor: item.materialDocumentNumber
                    ? theme.foregroundColor
                    : theme.secondaryForegroundColor,
                },
              ]}>
              <View style={styles(theme).historyItemLeftPanel}>
                <Text style={styles(theme).historyItemLeftPanelText}>
                  {goodsMovementLogs.length - index}
                </Text>
              </View>

              <View>
                <Text style={styles(theme).historyItemHeaderContainer}>
                  <Text style={styles(theme).historyItemHeaderText}>
                    Ενδοδιακίνηση:{' '}
                  </Text>
                  <Text style={styles(theme).historyItemHeaderText2}>
                    {item.materialDocumentNumber}
                  </Text>
                </Text>
                <Text style={styles(theme).historyItemHeaderContainer2}>
                  <Text style={styles(theme).historyItemHeaderText3}>
                    Προέλευση:{' '}
                  </Text>
                  <Text style={styles(theme).historyItemHeaderText4}>
                    {item.items[0].storageLocationIn}{' '}
                    {storageLocations[item.items[0].storageLocationIn]}
                  </Text>
                </Text>
                <Text style={styles(theme).historyItemHeaderContainer2}>
                  <Text style={styles(theme).historyItemHeaderText3}>
                    Προορισμός:{' '}
                  </Text>
                  <Text style={styles(theme).historyItemHeaderText4}>
                    {item.items[0].storageLocationOut}{' '}
                    {storageLocations[item.items[0].storageLocationOut]}
                  </Text>
                </Text>

                {item.items.map((item: MaterialDocumentItem, j: number) => (
                  //TODO: animate flatlist hiding individual items
                  <View key={j++}>
                    <Text style={styles(theme).historyItemLineText}>
                      Υλικό: {item.materialNumber}
                      {'\n'}
                      {materialDescriptions[item.materialNumber]}
                    </Text>
                    <Text style={styles(theme).historyItemLineText}>
                      Παρτίδα: {item.batch}
                    </Text>
                    <Text style={styles(theme).historyItemLineText}>
                      Ποσότητα: {item.quantity}
                      {'\n'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default React.memo(History);
