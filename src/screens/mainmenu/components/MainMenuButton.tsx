import React, {useContext} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
//import {styles} from '../../../styles/MainMenuStyles';
import {ThemeContext} from '../../../styles/ThemeContext';
import Icon from '../../../assets/Icon';
import {GlobalStyles} from '../../../styles/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';

interface MainMenuButtonProps {
  navigation: any;
  navigationLocation: string;
  icon: string;
  iconColor: string;
  text: string;
  backgroundColor: string | number;
}

function MainMenuButton(props: MainMenuButtonProps): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const {
    navigation,
    navigationLocation,
    icon,
    iconColor,
    text,
    backgroundColor,
  } = props;

  // function addValuesToColor(color: string | number): string {
  //   if (typeof color === 'number') {
  //     color = color.toString(16); // Convert number to hex string
  //   }
  //   let newColor = '#';
  //   for (let i = 1; i < color.length; i += 2) {
  //     let colorValue = parseInt(color.slice(i, i + 2), 16); // Extract two digits at a time and convert to number
  //     if (colorValue !== 0) {
  //       colorValue += 0x48; // Add 0x48 to non-zero colors
  //       if (colorValue > 0xff) {
  //         colorValue -= 0xff; // Reset value to 00 after FF is reached
  //       }
  //       newColor += colorValue.toString(16).padStart(2, '0').toUpperCase(); // Convert back to hex string and uppercase
  //     } else {
  //       newColor += color.slice(i, i + 2).toUpperCase(); // Leave zero colors as they are
  //     }
  //   }
  //   return newColor;
  // }

  //TODO: adjustGradientEndColor = newColor = color += 0x48. if newColor = FF, add half of 0x48 instead until its <=FF

  // const gradientColor: string = adjustColor(backgroundColor);
  // console.log('new');
  // console.log(gradientColor);

  return (
    <View style={{width: '50%', padding: '4%'}}>
      <LinearGradient
        colors={[backgroundColor, backgroundColor]}
        style={styles(theme).mainMenuButtonContainer}>
        <Pressable
          style={styles(theme).mainMenuButton}
          onPress={() => {
            navigation.navigate(navigationLocation);
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Icon name={icon} color={iconColor} size={100} />
        </Pressable>
      </LinearGradient>
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
    },
    mainMenuButton: {
      borderColor: theme.borderColor,
      backgroundColor: theme.foregroundColor,
      borderRadius: 20,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainMenuButtonTextContainer: {
      alignItems: 'center',
    },
    mainMenuButtonText: {
      color: theme.buttonTextColor,
      fontSize: 20,
    },
  });
