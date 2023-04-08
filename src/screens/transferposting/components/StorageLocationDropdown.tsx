import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import Repository from '../../../data/Repository';
import Icon from '../../../appearance/assets/Icon';
import {UserState} from '../../../redux/ReduxTypes';
import {useSelector} from 'react-redux';
import {StorageLocation} from '../../../shared/Types';

interface StorageLocationDropdownProps {
  placeholder: string;
  onChange: (storageLocation: string) => void;
}

interface dropDownContent {
  selectListData: {key: string; value: string}[];
}

function StorageLocationDropdown(
  props: StorageLocationDropdownProps,
): JSX.Element {
  const [dropDownData, setDropDownData] = useState<dropDownContent>({
    selectListData: [],
  });

  const user = useSelector((state: UserState) => state.user.user);

  useEffect(() => {
    const fetchStorageLocations = async () => {
      const storageLocations = await Repository.getStorageLocations();

      let filteredStorageLocations: StorageLocation[] = [];

      switch (user.buildingCode) {
        case 'A':
          filteredStorageLocations = storageLocations.filter(item => {
            return (
              item.storageLocation[0] === '1' ||
              item.storageLocation[0] === '2' ||
              item.storageLocation === '3100' ||
              item.storageLocation === '3200'
            );
          });
        case 'B':
          filteredStorageLocations = storageLocations.filter(item => {
            return (
              item.storageLocation[0] === '1' ||
              item.storageLocation[0] === '2' ||
              item.storageLocation === '3100' ||
              item.storageLocation === '3200'
            );
          });
        case 'C':
          filteredStorageLocations = storageLocations.filter(item => {
            return (
              item.storageLocation[0] === '3' ||
              item.storageLocation === '2100' ||
              item.storageLocation === '2200' ||
              item.storageLocation === '1005' ||
              item.storageLocation === '1100'
            );
          });
        default:
          filteredStorageLocations = storageLocations;
      }

      setDropDownData({
        selectListData: filteredStorageLocations.map(item => {
          return {
            key: item.storageLocation,
            value: item.storageLocation + ' ' + item.description,
          };
        }),
      });
    };

    fetchStorageLocations();
  }, []);

  const {placeholder, onChange} = props;
  const {theme} = useContext(ThemeContext);

  return (
    <SelectList
      setSelected={(storageLocation: string) => {
        onChange(storageLocation);
      }}
      save="key"
      search={false}
      arrowicon={<Icon name={'down'} color={'white'} size={20} />}
      closeicon={<Text />}
      placeholder={placeholder}
      boxStyles={styles(theme).dropDownBox}
      inputStyles={styles(theme).dropDownInput}
      dropdownTextStyles={styles(theme).dropDownText}
      data={dropDownData.selectListData}
    />
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    dropDownBox: {
      elevation: 5,
      backgroundColor: theme.foregroundColor,
      margin: '3%',
      borderRadius: 15,
    },
    dropDownInput: {
      color: theme.buttonTextColor,
      fontWeight: 'bold',
    },
    dropDownText: {
      color: theme.textColor,
    },
  });

export default StorageLocationDropdown;
