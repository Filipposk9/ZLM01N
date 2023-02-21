import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Animated} from 'react-native';
import {ThemeContext} from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

const {dark, theme, toggle} = useContext(ThemeContext);

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const [iconName, setIconName] = useState('');
const [iconColor, setIconColor] = useState('');

interface DarkModeSwitchProps {
  lightModeIcon: string;
  darkModeIcon: string;
  lightModeColor: string;
  darkModeColor: string;
  size: number;
  animation: Animated.AnimatedInterpolation<string>;
}

function DarkModeSwitch(props: DarkModeSwitchProps) {
  const {
    lightModeIcon,
    darkModeIcon,
    lightModeColor,
    darkModeColor,
    size,
    animation,
  } = props;

  return (
    <Pressable
      style={styles(theme).darkModeSwitchButton}
      onPress={() => {
        toggle();

        if (dark) {
          setIconName(lightModeIcon);
          setIconColor(lightModeColor);
        } else {
          setIconName(darkModeIcon);
          setIconColor(darkModeColor);
        }
      }}>
      <AnimatedIcon
        name={iconName}
        color={iconColor}
        size={size}
        style={{transform: [{rotateY: animation}]}}
      />
    </Pressable>
  );
}

//TODO: abstract away animation

const styles = (theme: any) =>
  StyleSheet.create({
    darkModeSwitchButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default React.memo(DarkModeSwitch);
