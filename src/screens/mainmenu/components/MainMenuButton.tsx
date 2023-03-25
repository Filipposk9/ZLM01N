import React, {useContext} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {GlobalStyles} from '../../../appearance/styles/GlobalStyles';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';
import Icon from '../../../appearance/assets/Icon';
import LinearGradient from 'react-native-linear-gradient';

interface MainMenuButtonProps {
  navigation: any;
  navigationLocation: string;
  icon: string;
  iconColor: string;
  text: string;
  backgroundColor: string;
}

function MainMenuButton(props: MainMenuButtonProps): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const [scaling, setScaling] = React.useState<number>(1);

  const {
    navigation,
    navigationLocation,
    icon,
    iconColor,
    text,
    backgroundColor,
  } = props;

  function modifyHexColor(hexColor: string): string {
    // Convert the hex string to RGB values
    const red = parseInt(hexColor.substring(1, 3), 16);
    const green = parseInt(hexColor.substring(3, 5), 16);
    const blue = parseInt(hexColor.substring(5, 7), 16);

    let newRed = 0,
      newGreen = 0,
      newBlue = 0;
    let additionFactor = 0x48;

    // Modify the RGB values by adding 0x48 to each
    if (red > 0) {
      newRed = red + additionFactor;
    }
    if (green > 0) {
      newGreen = green + additionFactor;
    }
    if (blue > 0) {
      newBlue = blue + additionFactor;
    }

    // Check if any value overflows and adjust if needed
    while (newRed > 255 || newGreen > 255 || newBlue > 255) {
      newRed = red + additionFactor;
      newGreen = green + additionFactor;
      newBlue = blue + additionFactor;

      additionFactor /= 0x2;
    }

    // Convert the modified RGB values back to hex
    const newHexColor = `#${[newRed, newGreen, newBlue]
      .map(c => c.toString(16).padStart(2, '0'))
      .join('')}`;

    return newHexColor;
  }

  return (
    <View
      style={{
        width: '50%',
        padding: '4%',
      }}>
      <Animated.View style={{transform: [{scale: scaling}]}}>
        <LinearGradient
          colors={[modifyHexColor(backgroundColor), backgroundColor]}
          style={styles(theme).mainMenuButtonContainer}>
          <Pressable
            style={styles(theme).mainMenuButton}
            onPress={() => {
              if (navigationLocation) {
                navigation.navigate(navigationLocation);
              }
            }}
            onTouchStart={() => {
              setScaling(0.9);
            }}
            onTouchEnd={() => {
              setScaling(1);
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Icon
              name={icon}
              color={iconColor}
              size={Dimensions.get('window').height / 9}
            />
          </Pressable>
        </LinearGradient>
      </Animated.View>
      <View style={styles(theme).mainMenuButtonTextContainer}>
        <Text style={styles(theme).mainMenuButtonText}>{text}</Text>
      </View>
    </View>
  );
}

export default MainMenuButton;

const styles = (theme: any) =>
  StyleSheet.create({
    mainMenuButtonContainer: {
      borderColor: theme.borderColor,
      borderRadius: 20,
      elevation: 5,
    },
    mainMenuButton: {
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      height: Dimensions.get('window').height / 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainMenuButtonTextContainer: {
      alignItems: 'center',
    },
    mainMenuButtonText: {
      color: theme.textColor,
      fontSize: 20,
    },
  });
