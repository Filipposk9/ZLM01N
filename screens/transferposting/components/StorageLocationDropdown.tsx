import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ThemeContext} from '../../../styles/ThemeContext';
import Repository from '../../../data/Repository';
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

  useEffect(() => {
    const fetchData = async () => {
      const storageLocations = await Repository.getStorageLocations();

      setDropDownData({
        selectListData: storageLocations.map(item => {
          return {
            key: item.storageLocation,
            value: item.storageLocation + ' ' + item.description,
          };
        }),
      });
    };

    fetchData();
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
      arrowicon={<Text />}
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
      backgroundColor: theme.foregroundColor,
      margin: '3%',
      borderColor: theme.borderColor,
      borderRadius: 20,
    },
    dropDownInput: {
      color: theme.buttonTextColor,
      margin: '2%',
    },
    dropDownText: {
      margin: '2%',
    },
  });

export default StorageLocationDropdown;
