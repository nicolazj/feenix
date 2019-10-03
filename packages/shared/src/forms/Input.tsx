
import React from 'react';
import { Field } from 'react-jeff';
import { Input, InputProps } from 'react-native-ui-kitten';

import { PropType } from '../types';

export const JInput: React.FC<
  Omit<InputProps, 'onChange' | 'value'> & PropType<Field<string>, 'props'>
> = ({ onChange, ...props }) => {
  return (
    <Input
      {...props}
      onChangeText={text => {
        onChange(text);
      }}
    />
  );
};