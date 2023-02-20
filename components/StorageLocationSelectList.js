import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import base64 from 'react-native-base64';
import {SelectList} from 'react-native-dropdown-select-list';
import {styles} from '../styles/TransferPostingStyles.js';
import {ThemeContext} from '../styles/ThemeContext.js';
import CredentialStorage from '../credentials/CredentialStorage.js';
import SapRequestHandler from '../sap/SapRequestHandler.js';
import UserContext, {StorageLocation} from '../realm/DBSchema.js';

const StorageLocationSelectList = ({placeholder, onStorageLocationChange}) => {
  const {theme} = React.useContext(ThemeContext);
  const [selectListData, setSelectListData] = useState([]);

  const {useRealm, useQuery, useObject} = UserContext;
  const realm = useRealm();
  const collection = useQuery(StorageLocation);

  useEffect(() => {
    const fetchData = async () => {
      const response = await SapRequestHandler.getStorageLocations();

      if (response !== undefined) {
        setSelectListData(
          response.map((item, i) => {
            handleAddStorageLocation(response[i]);
            return {
              key: item.LGORT,
              value: item.LGORT + ' ' + item.LGOBE,
            };
          }),
        );
      } else {
        setSelectListData(
          collection.map(item => {
            return {
              key: item.storageLocation,
              value: item.storageLocation + ' ' + item.description,
            };
          }),
        );
      }
    };

    fetchData();
  }, []);

  const handleAddStorageLocation = useCallback(
    response => {
      if (!response) {
        return;
      }

      let found = collection.find(
        element => element.storageLocation === response.LGORT,
      );

      if (!found) {
        realm.write(() => {
          realm.create(
            'StorageLocation',
            StorageLocation.generate(response.LGORT, response.LGOBE),
          );
          //realm.deleteAll();
        });
      }
    },
    [realm],
  );

  return (
    <SelectList
      setSelected={val => {
        onStorageLocationChange(val);
        //TODO: FIX LAG ON SELECTION CHANGE
      }}
      save="key"
      search={false}
      arrowicon={<Text />}
      closeicon={<Text />}
      placeholder={placeholder}
      boxStyles={styles(theme).storageLocationBox}
      inputStyles={styles(theme).storageLocationInput}
      dropdownTextStyles={styles(theme).storageLocationText}
      data={selectListData}
    />
  );
};

export default StorageLocationSelectList;
