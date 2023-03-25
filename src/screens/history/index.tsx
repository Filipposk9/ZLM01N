import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import Slide from '../../appearance/animations/Slide';
import {styles} from '../../appearance/styles/HistoryStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import Repository from '../../data/Repository';
import {GoodsMovementLogState} from '../../redux/ReduxTypes';
import {MaterialDocument, MaterialDocumentItem} from '../../shared/Types';

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLogs = useSelector((state: GoodsMovementLogState) =>
    state.goodsMovementLog.goodsMovementLog.slice().reverse(),
  );

  const animations = goodsMovementLogs.map(() => {
    return new Slide();
  });

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

  return (
    <View style={styles(theme).historyContainer}>
      <View style={styles(theme).historyHeader}>
        <Text style={styles(theme).historyHeaderText}>Ιστορικό Κινήσεων</Text>
      </View>
      <FlatList
        //TODO: make this view into a component GoodsMovemementLogComponent
        data={goodsMovementLogs}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() => {
                animations[index].setInterpolate(item.items.length * 100);
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
                <View style={styles(theme).historyItemTopPanel}>
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
                  </View>
                </View>

                <Animated.View style={animations[index].setInterpolate(0)}>
                  {item.items.map((item: MaterialDocumentItem, j: number) => {
                    return (
                      <View
                        style={{
                          marginLeft: '16%',
                          marginTop: '1%',
                        }}
                        key={j++}>
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
                    );
                  })}
                </Animated.View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles2 = StyleSheet.create({
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
  },
});

export default React.memo(History);
