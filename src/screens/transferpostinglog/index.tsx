import React, {useContext, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from '../../appearance/styles/TransferPostingLogStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {MaterialDocument, MaterialDocumentItem} from '../../shared/Types';

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
  const storageLocationout = route.params[2];

  //console.log(goodsMovementLog, 'log');

  //TODO: get material texts
  //TODO: split in 2 arrays, (needs validity indicator from backend)
  //TODO: rework styling, add material texts

  useEffect(() => {
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

  return (
    <View style={styles(theme).transferPostingLogTopContainer}>
      <View style={styles(theme).transferPostingLogHeaderContainer}>
        <View style={styles(theme).transferPostingLogHeaderLine}>
          <View style={{flex: 1}}>
            <Text style={styles(theme).transferPostingLogHeaderText}>
              Προέλευση:
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'right'}}>{storageLocationIn}</Text>
          </View>
        </View>
        <View style={styles(theme).transferPostingLogHeaderLine}>
          <View style={{flex: 1}}>
            <Text style={styles(theme).transferPostingLogHeaderText}>
              Προορισμός:
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'right'}}>{storageLocationout}</Text>
          </View>
        </View>
      </View>
      {/*//TODO: contents do not scroll*/}
      <ScrollView>
        <View
          style={[
            styles(theme).transferPostingLogContainer,
            {backgroundColor: theme.foregroundColor},
          ]}>
          <Text style={styles(theme).transferPostingLogTitle}>
            Επιτυχημένες ενδοδιακινήσεις
          </Text>
          <Text style={styles(theme).transferPostingLogTitle}>
            {goodsMovementLog.materialDocumentNumber !== ''
              ? 'Παραστατικό: ' + goodsMovementLog.materialDocumentNumber
              : ''}
          </Text>

          {goodsMovementLog !== undefined &&
          goodsMovementLog.materialDocumentNumber !== ''
            ? goodsMovementLog.items.map(
                (item: MaterialDocumentItem, i: number) => {
                  return (
                    <View key={i} style={styles(theme).transferPostingLogItem}>
                      <Text style={{fontWeight: 'bold'}}>
                        {item.count}. {item.materialNumber}
                      </Text>
                      <Text>Παρτίδα: {item.batch}</Text>
                      <Text>Ποσότητα: {item.quantity}</Text>
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
