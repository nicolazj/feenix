import React, { useState } from 'react';
import { Field } from 'react-jeff';
import { View } from 'react-native';
import {
    CheckBox, Input, InputProps, List, ListItem, Text, ThemedComponentProps,
    withStyles
} from 'react-native-ui-kitten';

import { T_ADDR_LOOKUP } from './types';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

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

export const JAddress_: React.FC<
  ThemedComponentProps &
    Omit<InputProps, 'onChange' | 'value'> &
    PropType<Field<string>, 'props'> & {
      onItemSelect: (addr: T_ADDR_LOOKUP) => void;
      data: T_ADDR_LOOKUP[];
    }
> = ({ onChange, onItemSelect, data, ...props }) => {
  const [selected, selectedSet] = useState(false);
  const onItemSelect_ = (addr: T_ADDR_LOOKUP) => {
    onItemSelect(addr);
    selectedSet(true);
    onChange(addr.label);
  };

  const renderItem = ({ item: addr }: { item: T_ADDR_LOOKUP }) => {
    return (
      <ListItem onPress={() => onItemSelect_(addr)}>
        <Text category="c2" numberOfLines={1}>
          {addr.label}
        </Text>
      </ListItem>
    );
  };
  return (
    <View>
      <Input
        {...props}
        onChangeText={text => {
          selectedSet(false);
          onChange(text);
        }}
      />
      {!selected && data.length > 0 && (
        <View
          style={{
            ...props.themedStyle.border,
            borderWidth: 1,
          }}
        >
          <List data={data} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
};

export const JAddress = withStyles(JAddress_, theme => {
  return {
    border: {
      borderColor: theme['color-primary-default'],
    },
  };
});

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
