import _debounce from 'lodash.debounce';
import React from 'react';
import { Field } from 'react-jeff';
import { CheckBox } from 'react-native-ui-kitten';

import { PropType } from '../types';

export const JCheckbox: React.FC<
  PropType<Field<string[]>, 'props'> & {
    options: {
      title: string;
      value: string;
    }[];
  }
> = ({ options, value, onChange }) => {
  const onChecked = (v: string) => (checked: boolean) => {
    if (checked) {
      onChange([...value, v]);
    } else {
      onChange(value.filter(val => val !== v));
    }
  };

  return (
    <>
      {options.map(option => {
        return (
          <CheckBox
            key={option.value}
            text={option.title}
            checked={value.includes(option.value)}
            onChange={onChecked(option.value)}
          />
        );
      })}
    </>
  );
};