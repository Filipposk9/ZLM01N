import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
import {styles} from '../../../styles/MainMenuStyles';
import {ThemeContext} from '../../../styles/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles} from '../../../styles/GlobalStyles';

interface MainMenuButtonProps {
  navigation: any;
  navigationLocation: string;
  icon: string;
  iconColor: string;
  text: string;
}

function MainMenuButton(props: MainMenuButtonProps): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const {navigation, navigationLocation, icon, iconColor, text} = props;

  return (
    <View style={styles(theme).mainMenuItem}>
      <Pressable
        style={styles(theme).mainMenuBtn}
        onPress={() => {
          navigation.navigate(navigationLocation);
        }}
        android_ripple={GlobalStyles(theme).rippleColor}>
        <Icon name={icon} color={iconColor} size={100} />
      </Pressable>
      <View style={styles(theme).mainMenuBtnTextContainer}>
        <Text style={styles(theme).mainMenuBtnText}>{text}</Text>
      </View>
    </View>
  );
}

export default MainMenuButton;
