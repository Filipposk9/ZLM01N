import React, {useContext} from 'react';

import {ScrollView, View, Text} from 'react-native';
import {styles} from '../styles/TransferPostingLogStyles.js';
import {ThemeContext} from '../styles/ThemeContext.js';

export default TransferPostingLog = ({route, navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  const {useRealm, useQuery, useObject} = UserContext;
  const realm = useRealm();

  const goodsMovementLog = route.params[0];

  let lgortIn = route.params[1];
  let lgortOut = route.params[2];

  let lgortInDescription = realm.objectForPrimaryKey(
    'StorageLocation',
    route.params[1],
  );

  let lgortOutDescription = realm.objectForPrimaryKey(
    'StorageLocation',
    route.params[2],
  );

  if (lgortInDescription !== undefined) {
    lgortIn =
      lgortInDescription.storageLocation +
      ' - ' +
      lgortInDescription.description;
    lgortOut =
      lgortOutDescription.storageLocation +
      ' - ' +
      lgortInDescription.description;
  }

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
            <Text style={{textAlign: 'right'}}>{lgortIn}</Text>
          </View>
        </View>
        <View style={styles(theme).transferPostingLogHeaderLine}>
          <View style={{flex: 1}}>
            <Text style={styles(theme).transferPostingLogHeaderText}>
              Προορισμός:
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'right'}}>{lgortOut}</Text>
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
};
