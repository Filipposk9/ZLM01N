import React, {useContext} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../styles/TransferPostingHistoryStyles';
import {ThemeContext} from '../../styles/ThemeContext';
import {GoodsMovementLogState} from '../../redux/ReduxTypes';

interface HistoryProps {}

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLogs = useSelector(
    (state: GoodsMovementLogState) => state.goodsMovementLog.goodsMovementLog,
  );

  console.log(goodsMovementLogs, 'history');

  return (
    <View style={styles(theme).transferPostingHistoryContainer}>
      <View style={styles(theme).transferPostingHistoryHeader}>
        <Text style={styles(theme).transferPostingHistoryHeaderText}>
          Ιστορικό Ενδοδιακινήσεων
        </Text>
      </View>
      <ScrollView>
        {goodsMovementLogs.map(() => {
          return (
            // <TransferPostingHistoryItem
            //   key={log.header.key}
            //   goodsMovementLog={log}
            // />
            <Text>a</Text>
          );
        })}
        <Text>a</Text>
      </ScrollView>
    </View>
  );
}

export default React.memo(History);
