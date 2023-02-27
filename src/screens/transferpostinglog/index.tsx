import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {styles} from '../../styles/TransferPostingLogStyles';
import {ThemeContext} from '../../styles/ThemeContext';

function TransferPostingLog({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLog = route.params[0];

  const storageLocationIn = route.params[1];
  const storageLocationout = route.params[2];

  return (
    <View>
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

          {goodsMovementLog.lineItems
            ? goodsMovementLog.lineItems.map((key, i) => {
                if (key.validity) {
                  return (
                    <View key={i} style={styles(theme).transferPostingLogItem}>
                      <Text style={{fontWeight: 'bold'}}>
                        {key.count}. {key.maktx}
                      </Text>
                      <Text>Παρτίδα: {key.charg}</Text>
                      <Text>Ποσότητα: {key.menge}</Text>
                    </View>
                  );
                }
              })
            : null}
        </View>

        <View
          style={[
            styles(theme).transferPostingLogContainer,
            {backgroundColor: theme.secondaryForegroundColor},
          ]}>
          <Text style={styles(theme).transferPostingLogTitle}>
            Αποτυχημένες ενδοδιακινήσεις
          </Text>

          {goodsMovementLog.lineItems
            ? goodsMovementLog.lineItems.map((key, i) => {
                if (!key.validity) {
                  return (
                    <View key={i} style={styles(theme).transferPostingLogItem}>
                      <Text style={{fontWeight: 'bold'}}>
                        {key.count}. {key.maktx}
                      </Text>
                      <Text>Παρτίδα: {key.charg}</Text>
                      <Text>Ποσότητα: {key.menge}</Text>
                    </View>
                  );
                }
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

export default React.memo(TransferPostingLog);
