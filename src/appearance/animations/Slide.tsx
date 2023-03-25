import {Animated, Easing} from 'react-native';

class Slide {
  private animatedValue: Animated.Value = new Animated.Value(0);
  private currentValue: number = 0;

  constructor() {
    this.currentValue = 0;
  }

  setInterpolate(height: number = 0) {
    if (this.currentValue >= 1) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      this.currentValue = 0;
    } else {
      Animated.timing(this.animatedValue, {
        toValue: height,
        easing: Easing.linear,
        duration: 500,
        useNativeDriver: false,
      }).start();
      this.currentValue = 1;
    }

    return {
      maxHeight: this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }
}

export default Slide;
