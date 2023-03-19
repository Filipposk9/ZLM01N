import {StyleSheet} from 'react-native';

export const styles = (theme: any) =>
  StyleSheet.create({
    storageLocationListHeader: {
      fontWeight: 'bold',
      fontSize: 20,
      margin: '4%',
    },
    storageLocationListContainer: {
      backgroundColor: theme.foregroundColor,
      margin: '4%',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    storageLocationListText: {
      marginLeft: '6%',
      marginTop: '2%',
      marginBottom: '2%',
      marginRight: '1%',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
  });
