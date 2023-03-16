import React, {useState, useContext, useEffect} from 'react';
import {View, TextInput, Pressable, Alert, Text} from 'react-native';
import {styles} from '../../styles/LoginStyles';
import {GlobalStyles} from '../../styles/GlobalStyles';

import DarkModeSwitch from '../../components/DarkModeSwitch';
import HorizontalRotation from '../../animations/HorizontalRotation';

import Spinner from 'react-native-loading-spinner-overlay';
import {ThemeContext} from '../../styles/ThemeContext';

import {useAppDispatch} from '../../redux/Store';
import {setCurrentUser} from '../../redux/actions/UserActions';
import {useSelector} from 'react-redux';
import Repository from '../../data/Repository';
import {User} from '../../shared/Types';
import {UserState} from '../../redux/ReduxTypes';

function Login({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [username, setUsername] = useState('FILKOZ');
  const [password, setPassword] = useState('COMPO2SITION4');
  const [users, setUsers] = useState<User[] | undefined>([]);

  const [isLoading, setIsLoading] = useState(false);

  //TODO: return setInterpolate instead of whole class
  //TODO: animation triggers on every button press
  const animation = HorizontalRotation.setInterpolate();

  const dispatch = useAppDispatch();

  const currentUser = useSelector((state: UserState) => state.user);

  useEffect((): void => {
    async function fetchUsers() {
      const users = await Repository.getUsers();

      setUsers(users);
      //TODO: get only 1 user instead of all?
    }
    fetchUsers();
  }, []);

  const userIsValid = (username: string, password: string): boolean => {
    if (users !== undefined) {
      return users.some(element => {
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
    }

    return false;
  };

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
      <View style={styles(theme).loginButtonContainer}>
        <Pressable
          style={styles(theme).loginButton}
          onPress={async () => {
            setIsLoading(true);

            if (userIsValid(username, password)) {
              dispatch(
                setCurrentUser({username: username, password: password}),
              );

              await Repository.initLocalDB();
              navigation.navigate('MainMenu');
            } else {
              Alert.alert('Λάθος όνομα/κωδικός χρήστη');
            }

            setIsLoading(false);
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).loginButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default React.memo(Login);
