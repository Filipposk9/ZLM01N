import React, {useContext} from 'react';
import {View, Text, Switch, Dimensions} from 'react-native';
import {styles} from '../../appearance/styles/SettingsStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import Icon from '../../appearance/assets/Icon';

function Settings({navigation}: {navigation: any}): JSX.Element {
  const {dark, theme, toggle} = useContext(ThemeContext);

  return (
    <View style={styles(theme).settingsContainer}>
      <View style={styles(theme).settingsHeaderContainer}>
        <Text style={styles(theme).settingsHeaderText}>Ρυθμίσεις</Text>
      </View>
      <View style={styles(theme).settingsListContainer}>
        <View style={styles(theme).settingsListItem}>
          <View style={styles(theme).settingsListItemIcon}>
            <Icon
              name={'moon'}
              color={theme.iconColor}
              size={Dimensions.get('window').height / 30}></Icon>
          </View>
          <View style={styles(theme).settingsListItemRight}>
            <Text style={styles(theme).settingsListItemText}>Dark Mode</Text>
            <View style={styles(theme).settingsListItemToggle}>
              <Switch
                trackColor={{
                  false: theme.foregroundColor,
                  true: theme.secondaryForegroundColor,
                }}
                thumbColor={theme.secondaryForegroundColor}
                onValueChange={() => toggle()}
                value={dark}></Switch>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Settings);
