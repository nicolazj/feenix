import _debounce from 'lodash.debounce';
import React from 'react';
import { Field } from 'react-jeff';
import { Select } from 'react-native-ui-kitten';

import { PropType, T_OPTION } from '../types';

export const JSelect: React.FC<
  PropType<Field<string>, 'props'> & {
    label: string;
    options: T_OPTION[];
  }
> = ({ options, value, onChange }) => {
  const options_ = options.map(op => ({ text: op.title, value: op.value }));
  return (
    <Select
      data={options_}
      selectedOption={options_.find(op => op.value === value)}
      onSelect={(op: any) => {
        console.log('onChange',op)
        onChange(op.value);
      }}
     
    />
  );
};
