import _debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Field } from 'react-jeff';
import { View } from 'react-native';
import {
    Input, InputProps, Interaction, List, ListItem, styled, Text,
    ThemedComponentProps
} from 'react-native-ui-kitten';

import api from '../api';
import { PropType, T_ADDR_LOOKUP } from '../types';

export const JAddress_: React.FC<
  ThemedComponentProps &
    Omit<InputProps, 'onChange' | 'value'> &
    PropType<Field<string>, 'props'> & {
      onItemSelect: (addr: T_ADDR_LOOKUP) => void;
    }
> & { styledComponentName: string } = ({ onChange, onItemSelect, dispatch, value, caption, ...props }) => {
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
    dispatch && dispatch([Interaction.FOCUSED]);
  }, []);
  useEffect(() => {
    if (value.length > 1 && !pristine) {
      lookup(value);
    }
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
            borderColor: props.themedStyle.borderColor,
            borderWidth: 1,
          }}
        >
          <List data={addressOptions} renderItem={renderItem} />
        </View>
      )}

      <Text category="c1" style={{ color: props.themedStyle.captionColor }}>
        {caption}
      </Text>
    </View>
  );
};

JAddress_.styledComponentName = 'Input';

export const JAddress = styled(JAddress_);

