import {Animated} from 'react-native';

class HorizontalRotation {
  private animatedValue: Animated.Value = new Animated.Value(0);
  private currentValue: number = 0;

  constructor() {}

  setInterpolate() {
    if (this.currentValue >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        this.animatedValue.setValue(this.currentValue);
      });
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        this.animatedValue.setValue(this.currentValue);
      });
    }

    return {
      transform: [
        {
          rotateY: this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };
  }
}

export default new HorizontalRotation();
