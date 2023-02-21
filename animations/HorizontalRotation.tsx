import {Animated, StyleSheet} from 'react-native';

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
    useNativeDriver: true,
  }).start(() => {
    animatedValue.setValue(currentValue);
  });
} else {
  Animated.spring(animatedValue, {
    toValue: 180,
    tension: 10,
    friction: 8,
    useNativeDriver: true,
  }).start(() => {
    animatedValue.setValue(currentValue);
  });
}

export const HorizontalRotation = animatedValue.interpolate({
  inputRange: [0, 180],
  outputRange: ['180deg', '360deg'],
});

//TODO: rotateY: AnimatedValue.AnimatedInterpolation
