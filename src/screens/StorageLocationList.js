import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, View, Text} from 'react-native';
import SapRequestHandler from '../sap/SapRequestHandler';

import {styles} from '../styles/StorageLocationListStyles';
import {ThemeContext} from '../styles/ThemeContext';

export default StorageLocationList = ({navigation}) => {
  const {dark, theme, toggle} = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);

  const [list, setList] = useState();

  const fetchData = async () => {
    let response = await SapRequestHandler.getStorageLocations();

    setList(response);
  };

  return (
    <ScrollView>
      <Text style={styles(theme).storageLocationListHeader}>
        Λίστα Αποθηκευτικών Χώρων
      </Text>
      <View style={styles(theme).storageLocationListContainer}>
        {list !== undefined
          ? list.map((key, i) => {
              return (
                <View key={i}>
                  <Text style={styles(theme).storageLocationListText}>
                    <Text style={{fontWeight: 'bold'}}>{key.LGORT}</Text>
                    <Text> - {key.LGOBE}</Text>
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
};
