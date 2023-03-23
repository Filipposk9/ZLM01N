import {Animated} from 'react-native';

class Slide {
  private animatedValue: Animated.Value = new Animated.Value(0);

  setInterpolate() {
    return {
      transform: [
        {
          scaleY: this.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 100],
          }),
        },
      ],
    };
  }

  //   slidedown = () => {
  //     // setDropdown(true)
  //     Animated.timing(this.animatedValue, {
  //       toValue: height,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();
  //   };

  //   slideup = () => {
  //     Animated.timing(this.animatedValue, {
  //       toValue: 0,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start(
  //       () => {},
  //       //  => setDropdown(false)
  //     );
  //   };
}

export default new Slide();
