import React, {useContext, useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ThemeContext} from '../../../styles/ThemeContext';
import Repository from '../../../data/Repository';
import {StorageLocation} from '../../../shared/Types';

//const [selectListData, setSelectListData] = useState();

interface StorageLocationDropdownProps {
  placeholder: string;
  //onChange: (val: string) => void;
}

function StorageLocationDropdown(
  props: StorageLocationDropdownProps,
): JSX.Element {
  useEffect(() => {
    console.log('a');

    const fetchData = async () => {
      const data = await Repository.getStorageLocations();
      console.log(data);
    };

    fetchData();
  }, []);

  const {placeholder} = props;
  const {theme} = useContext(ThemeContext);

  return (
    <SelectList
      setSelected={() => {
        console.log('a');
      }}
      save="key"
      search={false}
      arrowicon={<Text />}
      closeicon={<Text />}
      placeholder={placeholder}
      boxStyles={styles(theme).dropDownBox}
      inputStyles={styles(theme).dropDownInput}
      dropdownTextStyles={styles(theme).dropDownText}
      data={[]}
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
