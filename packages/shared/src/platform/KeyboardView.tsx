import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, View, ViewProps } from 'react-native';
import { animated, useSpring } from 'react-spring';

const AnimatedView = (animated(View) as unknown) as typeof View;

const KeyboardView: React.FC<ViewProps> = ({ children, ...props }) => {
  const [height, set] = useState(0);
  const styles = useSpring({
    from: { height: 0 },
    to: { height },
  });
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
        set(e.endCoordinates.height);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e => {
        set(0);
      });

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  return (
    <View {...props}>
      {children}
      <AnimatedView style={styles}></AnimatedView>
    </View>
  );
};

export default KeyboardView;
