import React, {useState, useContext} from 'react';
import {View, TextInput} from 'react-native';
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
      <TextInput
        style={styles(theme).usernameInput}
        placeholder="Username"
        placeholderTextColor="white"
        onChangeText={username => setUsername(username)}
        value={username}
      />
      <TextInput
        style={styles(theme).passwordInput}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
        value={password}
      />

      {/* <Pressable
              style={styles(theme).loginBtn}
              onPress={() => {
                setLoading(true);

                let usernameChecks = collection.some(element => {
                  if (element.username === username) {
                    if (element.password === password) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                });

                setLoading(false);

                if (usernameChecks) {
                  navigation.navigate('MainMenu');
                } else {
                  alert('Λάθος όνομα/κωδικός χρήστη');
                }
              }}
              android_ripple={GlobalStyles(theme).rippleColor}>
              <Text style={styles(theme).loginBtnText}>Login</Text>
            </Pressable> */}
    </View>
  );
}

export default React.memo(Login);
