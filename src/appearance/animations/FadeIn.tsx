import {Animated} from 'react-native';

class FadeIn {
  private animatedValue: Animated.Value = new Animated.Value(0);
  private currentValue: number = 0;

  //FIXME: this is incomplete, does not work

  constructor() {
    this.animatedValue.addListener(({value}) => {
      this.currentValue = value;
    });
  }

  setInterpolate(): Animated.AnimatedInterpolation {
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start(() => {
      this.animatedValue.setValue(this.currentValue);
    });
  }
}

export default new FadeIn();
