import {Animated, Easing} from 'react-native';

class Slide {
  private animatedValue: Animated.Value = new Animated.Value(0);
  private currentValue: number = 0;
  private init: boolean = true;

  constructor() {}

  setInterpolate(height: number = 0) {
    console.log(this.currentValue);
    console.log(height, 'h');
    if (this.currentValue >= 1) {
      console.log('gonig up');
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
      if (this.init) {
        this.currentValue = 0;
        this.init = false;
      } else {
        this.currentValue = 1;
      }
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
