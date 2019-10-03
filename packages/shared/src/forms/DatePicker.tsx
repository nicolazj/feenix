import { format, parse } from 'date-fns';
import React from 'react';
import { Field } from 'react-jeff';
import {
    Datepicker, styled, Text, ThemedComponentProps
} from 'react-native-ui-kitten';

import { PropType } from '../types';

const formatter = 'dd/MM/yyyy';

const JDatePicker_: React.FC<
  ThemedComponentProps & PropType<Field<string>, 'props'> & { label: string; caption: string }
> & { styledComponentName: string } = ({ onChange, value, label, caption, themedStyle }) => {
  return (
    <>
      <Text category="p1" style={{ color: themedStyle.labelColor }}>
        {label}
      </Text>
      <Datepicker
        date={value ? parse(value, formatter, new Date()) : null}
        onSelect={(date: any) => {
          onChange(format(date, formatter));
        }}
      />
      <Text category="c1" style={{ color: themedStyle.captionColor }}>
        {caption}
      </Text>
    </>
  );
};

JDatePicker_.styledComponentName = 'Input';

export const JDatePicker = styled(JDatePicker_);
