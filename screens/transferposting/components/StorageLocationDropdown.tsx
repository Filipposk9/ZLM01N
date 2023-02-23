import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ThemeContext} from '../../../styles/ThemeContext';
import Repository from '../../../data/Repository';
import {StorageLocation} from '../../../shared/Types';

const [selectListData, setSelectListData] = useState<any>();

interface StorageLocationDropdownProps {
  placeholder: string;
  onChange: (val: string) => void;
}

useEffect(() => {
  console.log('a');

  const fetchData = async () => {
    const data = await Repository.getStorageLocations();
    console.log(data);

    setSelectListData(data);
  };

  fetchData();
}, []);

function StorageLocationDropdown(
  props: StorageLocationDropdownProps,
): JSX.Element {
  const {placeholder, onChange} = props;

  const {theme} = useContext(ThemeContext);

  return (
    <SelectList
      setSelected={(val: string) => {
        onChange(val);
        //TODO: FIX LAG ON SELECTION CHANGE
      }}
      save="key"
      search={false}
      arrowicon={<Text />}
      closeicon={<Text />}
      placeholder={placeholder}
      boxStyles={styles(theme).dropDownBox}
      inputStyles={styles(theme).dropDownInput}
      dropdownTextStyles={styles(theme).dropDownText}
      data={selectListData}
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
