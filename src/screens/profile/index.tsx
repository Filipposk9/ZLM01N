import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../appearance/styles/ProfileStyles';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {UserState} from '../../redux/ReduxTypes';
import {useSelector} from 'react-redux';

function Profile({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const user = useSelector((state: UserState) => state.user.user);

  return (
    <View style={styles(theme).profileContainer}>
      <View style={styles(theme).profileEmblemContainer}>
        <View style={styles(theme).profileEmblem}>
          <Text style={styles(theme).profileEmblemText}>FK</Text>
        </View>
        <Text style={styles(theme).profileEmblemDescription}>
          {user.firstName + ' ' + user.lastName}
        </Text>
      </View>
      <View style={styles(theme).profileInfoContainer}>
        <View style={styles(theme).profileInfoLine}>
          <Text style={styles(theme).profileInfoLineText}>
            {'Κτίριο Εργασίας: Κτίριο ' + user.buildingCode}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(Profile);
