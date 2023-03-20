import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from '../../appearance/styles/TransferPostingLogStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import Repository from '../../data/Repository';
import {
  Material,
  MaterialDocument,
  MaterialDocumentItem,
} from '../../shared/Types';

function TransferPostingLog({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLog: MaterialDocument = route.params[0];

  const storageLocationIn = route.params[1];
  const storageLocationOut = route.params[2];

  const [storageLocationInDescription, setStorageLocationInDescription] =
    useState<string>();
  const [storageLocationOutDescription, setStorageLocationOutDescription] =
    useState<string>();

  const [materialDescriptions, setMaterialDescriptions] = useState([]);
  //TODO: split in 2 arrays, (needs validity indicator from backend)
  //TODO: rework styling, add material texts

  useEffect(() => {
    const getStorageLocationDescriptions = async () => {
      const responseIn = await Repository.getStorageLocation(storageLocationIn);

      if (responseIn) {
        setStorageLocationInDescription(responseIn.description);
      }

      const responseOut = await Repository.getStorageLocation(
        storageLocationOut,
      );

      if (responseOut) {
        setStorageLocationOutDescription(responseOut.description);
      }
    };

    const getMaterialDescriptions = async () => {
      const materialTexts = [];

      for (let i = 0; i < goodsMovementLog.items.length; i++) {
        const response = await Repository.getMaterialBasicData(
          goodsMovementLog.items[i].materialNumber,
        );

        materialTexts.push(response);
      }

      setMaterialDescriptions(materialTexts);
    };

    getStorageLocationDescriptions();
    getMaterialDescriptions();

    // const { validMaterialDocument, invalidMaterialDocument } = items.reduce(
    //     (acc, item) => {
    //       if (item.category === "A") {
    //         acc.validMaterialDocument.push(item);
    //       } else {
    //         acc.invalidMaterialDocument.push(item);
    //       }
    //       return acc;
    //     },
    //     { validMaterialDocument: [], invalidMaterialDocument: [] }
    // )
  }, []);

  console.log(materialDescriptions);

  return (
    <View style={styles(theme).transferPostingLogTopContainer}>
      <View style={styles(theme).transferPostingLogHeaderContainer}>
        <View style={styles(theme).transferPostingLogHeaderLine}>
          <Text style={styles(theme).transferPostingLogHeaderText}>
            Προέλευση: {storageLocationInDescription}
          </Text>
        </View>
        <View style={styles(theme).transferPostingLogHeaderLine}>
          <Text style={styles(theme).transferPostingLogHeaderText}>
            Προορισμός: {storageLocationOutDescription}
          </Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles(theme).transferPostingLogTitle}>
          {goodsMovementLog.materialDocumentNumber !== ''
            ? 'Επιτυχημένες Ενδοδιακινήσεις'
            : null}
        </Text>
        <View
          style={[
            styles(theme).transferPostingLogContainer,
            {backgroundColor: theme.foregroundColor},
          ]}>
          <Text style={styles(theme).transferPostingLogMaterialNumber}>
            {goodsMovementLog.materialDocumentNumber !== ''
              ? 'Παραστατικό: ' + goodsMovementLog.materialDocumentNumber
              : null}
          </Text>

          {goodsMovementLog !== undefined &&
          goodsMovementLog.materialDocumentNumber !== ''
            ? goodsMovementLog.items.map(
                (item: MaterialDocumentItem, i: number) => {
                  return (
                    <View key={i} style={styles(theme).transferPostingLogItem}>
                      <View style={styles(theme).transferPostingLogPanelLeft}>
                        <Text style={styles(theme).transferPostingLogTextLeft}>
                          {item.count}
                        </Text>
                      </View>
                      <View style={styles(theme).transferPostingLogPanelRight}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: theme.buttonTextColor,
                          }}>
                          Κωδικός Υλικού: {item.materialNumber} {'\n'}
                          {materialDescriptions[i].description}
                        </Text>
                        <Text style={{color: theme.buttonTextColor}}>
                          Παρτίδα: {item.batch}
                        </Text>
                        <Text style={{color: theme.buttonTextColor}}>
                          Ποσότητα: {item.quantity}
                        </Text>
                        <Text></Text>
                      </View>
                    </View>
                  );
                },
              )
            : null}
        </View>

        <View
          style={[
            styles(theme).transferPostingLogContainer,
            {backgroundColor: theme.secondaryForegroundColor},
          ]}>
          {goodsMovementLog !== undefined &&
          goodsMovementLog.materialDocumentNumber === '' ? (
            <Text style={styles(theme).transferPostingLogTitle}>
              Αποτυχημένες ενδοδιακινήσεις
            </Text>
          ) : null}

          {goodsMovementLog !== undefined &&
          goodsMovementLog.materialDocumentNumber === ''
            ? goodsMovementLog.items.map(
                (item: MaterialDocumentItem, i: number) => {
                  return (
                    <View key={i} style={styles(theme).transferPostingLogItem}>
                      <Text
                        style={[
                          styles(theme).transferPostingLogItemText,
                          {fontWeight: 'bold'},
                        ]}>
                        {item.count}. {item.materialNumber}
                      </Text>
                      <Text style={styles(theme).transferPostingLogItemText}>
                        Παρτίδα: {item.batch}
                      </Text>
                      <Text style={styles(theme).transferPostingLogItemText}>
                        Ποσότητα: {item.quantity}
                      </Text>
                    </View>
                  );
                },
              )
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default React.memo(TransferPostingLog);
