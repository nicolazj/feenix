import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import { useTransition } from 'react-spring';
import { animated } from 'react-spring/native';

const AnimatedView = animated(View);

const { width } = Dimensions.get('window');
console.log(width);
// const Screen: React.FC = (props: any) => {
//   return (
//     <AnimatedView style={props.style}>
//       <Text>{props.value}132</Text>
//     </AnimatedView>
//   );
// };
export const Screen: React.FC = (props: any) => {
  return (
    <AnimatedView
      style={{
        ...props.style,
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
export const Screens: React.FC<{ cur: number }> = ({
  children,
  cur,
  ...props
}) => {
  const transitions = useTransition(cur, p => p, {
    from: {
      opacity: 0,
      transform: [
        {
          translateX: 100,
        },
      ],
    },
    enter: {
      opacity: 1,
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    leave: {
      opacity: 0,
      transform: [
        {
          translateX: -100,
        },
      ],
    },
  });
  return (
    <View {...props}>
      {transitions.map(({ item, props, key }) => {
        const child = React.Children.toArray(children)[item];
        return React.cloneElement(child, { key, style: props });
      })}
    </View>
  );
};
