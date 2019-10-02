import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { animated, useTransition } from 'react-spring';

import useDimensions from '../hooks/useDimensions';

const AnimatedView = (animated(View) as unknown) as typeof View;

export const Screen: React.FC<{ style?: any }> = (props: any) => {
  return (
    <AnimatedView
      style={{
        transform: props.style.width.interpolate((width: number) =>
          Platform.select({
            web: [{ translateX: width + 'px' }],
            default: [{ translateX: width }],
          })
        ),
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {props.children}
    </AnimatedView>
  );
};

export const ScreensContext = React.createContext<{
  cur: number;
  prev: () => void;
  next: () => void;
}>({ cur: 0, next: () => {}, prev: () => {} });

export const Screens: React.FC<{ current?: number; style: any }> = ({
  children,
  current = 0,
  ...props
}) => {
  const { screen } = useDimensions();
  const [cur, curSet] = useState(current);
  const [forward, forwardSet] = useState(true);
  const transitions = useTransition(cur, p => p, {
    from: {
      width: forward ? screen.width : -screen.width,
    },
    enter: {
      width: 0,
    },
    leave: {
      width: forward ? -screen.width : screen.width,
    },
  });

  const len = React.Children.count(children);

  const prev = () => {
    if (cur > 0) {
      curSet((cur - 1) % len);
      forwardSet(false);
    }
  };

  const next = () => {
    if (cur < len - 1) {
      curSet((cur + 1) % len);
      forwardSet(true);
    }
  };
  return (
    <ScreensContext.Provider value={{ cur, prev, next }}>
      <View {...props}>
        {transitions.map(({ item, props, key }: any) => {
          const child = React.Children.toArray(children)[
            item
          ] as React.ReactElement<any>;
          return React.cloneElement(child, { key, style: props });
        })}
      </View>
    </ScreensContext.Provider>
  );
};
