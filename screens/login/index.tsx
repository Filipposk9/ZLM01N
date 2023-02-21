import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {styles} from '../../styles/LoginStyles.js';

import DarkModeSwitch from '../../components/DarkModeSwitch.js';
import {HorizontalRotation} from '../../animations/HorizontalRotation.js';

import Spinner from 'react-native-loading-spinner-overlay';
import {ThemeContext} from '../../styles/ThemeContext.js';

//TODO: Logout and clear()

const {theme} = useContext(ThemeContext);

function Login({navigation}: {navigation: any}): JSX.Element {
  const [username, setUsername] = useState('FILKOZ');
  const [password, setPassword] = useState('COMPO2SITION4');

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles(theme).loginContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Σύνδεση...'}
        textStyle={{color: 'white'}}
      />
      <View style={styles(theme).darkModeSwitchContainer}>
        <DarkModeSwitch
          icon={'feather'}
          color={'red'}
          size={30}
          animation={HorizontalRotation}
        />
      </View>
    </View>
  );
}

export default React.memo(Login);
