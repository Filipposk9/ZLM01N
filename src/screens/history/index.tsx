import React, {useContext} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {styles} from '../../appearance/styles/HistoryStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {GoodsMovementLogState} from '../../redux/ReduxTypes';
import GoodsMovemementLogComponent from './components/GoodsMovemementLogComponent';

function History(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const goodsMovementLogs = useSelector((state: GoodsMovementLogState) =>
    state.goodsMovementLog.goodsMovementLog.slice().reverse(),
  );

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
            <GoodsMovemementLogComponent
              goodsMovementLog={item}
              count={
                goodsMovementLogs.length - index
              }></GoodsMovemementLogComponent>
          );
        }}
      />
    </View>
  );
}

export default React.memo(History);
