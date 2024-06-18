import {StyleSheet} from 'react-native';
import {iTheme} from '../theme/types';

export const styles = (theme: iTheme) =>
  StyleSheet.create({
    settingsContainer: {
      backgroundColor: theme.backgroundColor,
      height: '100%',
    },
    settingsHeaderContainer: {
      marginTop: '10%',
      margin: '4%',
    },
    settingsHeaderText: {
      fontWeight: 'bold',
      fontSize: 32,
      color: theme.secondaryTextColor,
    },
    settingsListContainer: {
      margin: '2%',
      backgroundColor: theme.secondaryBackgroundColor,
      borderRadius: 5,
    },
    settingsListItem: {
      flexDirection: 'row',
      margin: '2%',
    },
    settingsListItemIcon: {},
    settingsListItemRight: {
      marginLeft: '4%',
      flexDirection: 'row',
    },
    settingsListItemToggle: {
      alignItems: 'flex-end',
      width: '70%',
    },
    settingsListItemText: {
      fontSize: 16,
      color: theme.secondaryTextColor,
    },
  });
