import { format, parse } from 'date-fns';
import React from 'react';
import { Field } from 'react-jeff';
import { Datepicker, Text } from 'react-native-ui-kitten';

import { PropType } from '../types';

const formatter = 'dd/MM/yyyy';

export const JDatePicker: React.FC<
  PropType<Field<string>, 'props'> & { label: string; caption: string }
> = ({ onChange, value, label, caption }) => {
  return (
    <>
      <Text category="p1">{label}</Text>
      <Datepicker
        date={value ? parse(value, formatter, new Date()) : null}
        onSelect={(date: any) => {
          onChange(format(date, formatter));
        }}
      />
      <Text category="p1">{caption}</Text>
    </>
  );
};
