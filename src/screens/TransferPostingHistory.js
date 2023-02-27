import React, {useContext} from 'react';

import {ScrollView, View, Text} from 'react-native';

import {useSelector} from 'react-redux';

import TransferPostingHistoryItem from '../components/TransferPostingHistoryItem.js';

import {ThemeContext} from '../styles/ThemeContext';
import {styles} from '../styles/TransferPostingHistoryStyles';

export default TransferPostingHistory = ({navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  const goodsMovementLogArray = useSelector(
    store => store.goodsMovementLogArray.goodsMovementLogArray,
  );

  return (
    <View style={styles(theme).transferPostingHistoryContainer}>
      <View style={styles(theme).transferPostingHistoryHeader}>
        <Text style={styles(theme).transferPostingHistoryHeaderText}>
          Ιστορικό Ενδοδιακινήσεων
        </Text>
      </View>
      <ScrollView>
        {goodsMovementLogArray.map(log => {
          return (
            <TransferPostingHistoryItem
              key={log.header.key}
              goodsMovementLog={log}></TransferPostingHistoryItem>
          );
        })}
      </ScrollView>
    </View>
  );
};
