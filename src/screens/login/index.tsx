import React, {useState, useContext} from 'react';
import {View, TextInput, Pressable, Text, Alert} from 'react-native';
import {styles} from '../../appearance/styles/LoginStyles';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';
import DarkModeSwitch from '../../utilities/components/DarkModeSwitch';
import HorizontalRotation from '../../appearance/animations/HorizontalRotation';
import Spinner from 'react-native-loading-spinner-overlay';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {useAppDispatch} from '../../redux/Store';
import Repository from '../../data/Repository';
import {setCurrentUser} from '../../redux/actions/UserActions';

function Login({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [username, setUsername] = useState<string>('Όνομα Χρήστη');
  const [password, setPassword] = useState<string>('Κωδικός Πρόσβασης');

  const [isLoading, setIsLoading] = useState(false);

  //TODO: animation triggers on every button press
  const animation = HorizontalRotation.setInterpolate();

  const dispatch = useAppDispatch();

  return (
    <View style={styles(theme).loginContainer}>
      <Spinner
        visible={isLoading}
        textContent={'Σύνδεση...'}
        textStyle={{color: 'white'}}
      />
      <View style={styles(theme).darkModeSwitchContainer}>
        <DarkModeSwitch
          lightModeIcon={'sun'}
          darkModeIcon={'moon'}
          lightModeColor={'#222222'}
          darkModeColor={'#ffffff'}
          size={30}
          animation={animation}
        />
      </View>
      <TextInput
        style={styles(theme).usernameInput}
        placeholderTextColor="white"
        onFocus={() => {
          if (username === 'Όνομα Χρήστη') {
            setUsername('');
          }
        }}
        onBlur={() => {
          if (username === '') {
            setUsername('Όνομα Χρήστη');
          }
        }}
        onChangeText={username => setUsername(username)}
        value={username}
      />
      <TextInput
        style={styles(theme).passwordInput}
        placeholderTextColor="white"
        secureTextEntry={true}
        onFocus={() => {
          if (password === 'Κωδικός Πρόσβασης') {
            setPassword('');
          }
        }}
        onBlur={() => {
          if (password === '') {
            setPassword('Κωδικός Πρόσβασης');
          }
        }}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <View style={styles(theme).loginButtonContainer}>
        <Pressable
          style={styles(theme).loginButton}
          onPress={async () => {
            setIsLoading(true);

            const user = await Repository.initLocalDB(username, password);

            if (user !== undefined) {
              dispatch(setCurrentUser(user));

              navigation.navigate('MainMenu');
            } else {
              Alert.alert('Λάθος όνομα/κωδικός χρήστη');
            }

            setIsLoading(false);
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).loginButtonText}>Είσοδος</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(Login);
