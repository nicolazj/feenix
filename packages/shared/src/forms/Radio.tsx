import _debounce from 'lodash.debounce';
import React from 'react';
import { Field } from 'react-jeff';
import { View } from 'react-native';
import { Radio, Text } from 'react-native-ui-kitten';

import { PropType } from '../types';

export const JRadio: React.FC<
  PropType<Field<string>, 'props'> & {
    label: string;
    options: {
      title: string;
      value: string;
    }[];
  }
> = ({ options, value, onChange, label }) => {
  return (
    <>
      <Text>{label}</Text>
      {options.map(option => {
        return (
          <View key={option.value} style={{ paddingVertical: 8 }}>
            <Radio
              text={option.title}
              checked={value === option.value}
              onChange={selected => {
                selected && onChange(option.value);
              }}
            />
          </View>
        );
      })}
    </>
  );
};
