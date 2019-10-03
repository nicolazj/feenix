import { format, parse } from 'date-fns';
import _debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Field } from 'react-jeff';
import { View } from 'react-native';
import {
    CheckBox, Datepicker, Input, InputProps, List, ListItem, Text,
    ThemedComponentProps, withStyles
} from 'react-native-ui-kitten';

import api from '../api';
import { PropType, T_ADDR_LOOKUP } from '../types';

export const JAddress_: React.FC<
  ThemedComponentProps &
    Omit<InputProps, 'onChange' | 'value'> &
    PropType<Field<string>, 'props'> & {
      onItemSelect: (addr: T_ADDR_LOOKUP) => void;
    }
> = ({ onChange, onItemSelect, value, ...props }) => {
  const [selected, selectedSet] = useState(false);
  const [pristine, pristineSet] = useState(true);
  const [addressOptions, addressOptionsSet] = useState([] as T_ADDR_LOOKUP[]);

  const lookup = useCallback(
    _debounce(async (address: string) => {
      const data = await api.address.lookup(address);
      addressOptionsSet(data.slice(0, 5));
    }, 1000),
    []
  );
  useEffect(() => {
    if (value.length > 1 && !pristine) lookup(value);
  }, [value, pristine]);

  const onItemSelect_ = (addr: T_ADDR_LOOKUP) => {
    onItemSelect(addr);
    selectedSet(true);
    onChange(addr.label);
  };

  const renderItem = ({ item: addr }: { item: T_ADDR_LOOKUP }) => {
    return (
      <ListItem key={addr.tui} onPress={() => onItemSelect_(addr)}>
        <Text category="c1" numberOfLines={1}>
          {addr.label}
        </Text>
      </ListItem>
    );
  };
  return (
    <View>
      <Input
        {...props}
        value={value}
        onChangeText={text => {
          selectedSet(false);
          pristineSet(false);
          onChange(text);
        }}
      />
      {!selected && addressOptions.length > 0 && (
        <View
          style={{
            ...props.themedStyle.border,
            borderWidth: 1,
          }}
        >
          <List data={addressOptions} renderItem={renderItem} />
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
