import {Animated} from 'react-native';

class HorizontalDrag {
  private animatedValue: Animated.Value = new Animated.Value(0);

  setInterpolate(hiddenPanel: Element): Animated.AnimatedInterpolation {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });

    return hiddenPanel;
  }
}

export default new HorizontalDrag();
