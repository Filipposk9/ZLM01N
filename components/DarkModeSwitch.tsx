import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Animated} from 'react-native';
import {ThemeContext} from '../styles/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

interface DarkModeSwitchProps {
  lightModeIcon: string;
  darkModeIcon: string;
  lightModeColor: string;
  darkModeColor: string;
  size: number;
  animation: Animated.AnimatedInterpolation<string>;
}

function DarkModeSwitch(props: DarkModeSwitchProps): JSX.Element {
  const {
    lightModeIcon,
    darkModeIcon,
    lightModeColor,
    darkModeColor,
    size,
    animation,
  } = props;

  //TODO: remove icon import
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const [iconName, setIconName] = useState(lightModeIcon);
  const [iconColor, setIconColor] = useState(lightModeColor);
  const {dark, theme, toggle} = useContext(ThemeContext);

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
        style={animation}
      />
    </Pressable>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    darkModeSwitchButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default React.memo(DarkModeSwitch);
