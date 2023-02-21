import React, {useState, useContext, useCallback} from 'react';
import {Pressable, TextInput, Text, View, Animated, Easing} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';

import {styles} from '../styles/LoginStyles.js';
import {GlobalStyles} from '../styles/GlobalStyles.js';
import {ThemeProvider, ThemeContext} from '../styles/ThemeContext.js';

import UserContext, {User} from '../realm/DBSchema.js';

//TODO: Logout and clear()

export default LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('FILKOZ');
  const [password, setPassword] = useState('COMPO2SITION4');

  const {useRealm, useQuery, useObject} = UserContext;
  const realm = useRealm();

  const handleAddUser = useCallback(
    (description: string): void => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create('User', User.generate('FILKOZ'));
        console.log('written');
      });
    },
    [realm],
  );

  const collection = useQuery(User);

  const [loading, setLoading] = useState(false);

  const [iconName, setIconName] = useState('sun');
  const [iconColor, setIconColor] = useState('#222222');

  const {dark, theme, toggle} = useContext(ThemeContext);

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  if (currentValue >= 90) {
    Animated.spring(animatedValue, {
      toValue: 0,
      tension: 10,
      friction: 8,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(currentValue);
    });
  } else {
    Animated.spring(animatedValue, {
      toValue: 180,
      tension: 10,
      friction: 8,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(currentValue);
    });
  }

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <ThemeProvider>
      <View style={styles(theme).loginContainer}>
        <View style={styles(theme).darkModeSwitchContainer}>
          <Pressable
            style={styles(theme).toggleAppearanceBtn}
            onPress={() => {
              toggle();
              if (iconName === 'sun') {
                setIconName('moon');
                setIconColor('white');
              } else {
                setIconName('sun');
                setIconColor('#222222');
              }
            }}>
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              size={30}
              style={{transform: [{rotateY: setInterpolate}]}}
            />
          </Pressable>
        </View>

        <View style={styles(theme).loginBodyContainer}>
          <Spinner
            visible={loading}
            textContent={'Σύνδεση...'}
            textStyle={{color: 'white'}}
          />
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

          <View style={styles(theme).loginBtnView}>
            <Pressable
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
            </Pressable>
          </View>
        </View>
      </View>
    </ThemeProvider>
  );
};
