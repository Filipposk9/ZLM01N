import React, {useContext} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {styles} from '../../appearance/styles/HistoryStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import HistoryItem from './components/HistoryItem';
import {RootState} from '../../redux/Store';

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLogs = useSelector((state: RootState) =>
    state.goodsMovementLog.goodsMovementLog.slice().reverse(),
  );

  return (
    <View style={styles(theme).historyContainer}>
      <View style={styles(theme).historyHeader}>
        <Text style={styles(theme).historyHeaderText}>Ιστορικό Κινήσεων</Text>
      </View>
      <FlatList
        data={goodsMovementLogs}
        renderItem={({item, index}) => {
          return (
            <HistoryItem
              goodsMovementLog={item}
              count={goodsMovementLogs.length - index}></HistoryItem>
          );
        }}
      />
    </View>
  );
}

export default React.memo(History);
