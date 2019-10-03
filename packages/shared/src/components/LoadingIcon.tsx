import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { Icon } from 'react-native-ui-kitten';

export const LoadingIcon = (props:any) => {
  const spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  useEffect(() => {
    Animated.loop(Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }), {}).start();
  }, []);
  return (<Animated.View style={{ transform: [{ rotate: spin }] }}>
    <Icon {...props.style[0]} name="loader-outline" />
  </Animated.View>);
};
