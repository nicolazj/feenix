import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, View, ViewProps } from 'react-native';

const KeyboardView: React.FC<ViewProps> = ({ children, ...props }) => {
  const [height, set] = useState(0);
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
      <View style={{ height }}></View>
    </View>
  );
};

export default KeyboardView;
