import React, { useEffect, useState } from 'react';
import { Field } from 'react-jeff';
import { View } from 'react-native';
import { Input, InputProps, List, ListItem } from 'react-native-ui-kitten';

import { T_ADDR_LOOKUP } from './types';

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export const JInput: React.FC<
  Omit<InputProps, 'onChange' | 'value'> & PropType<Field<string>, 'props'>
> = ({ onChange, ...props }) => {
  return (
    <Input
      {...props}
      onChangeText={text => {
        onChange(text); // Make sure all of your inputs call `props.onChange` with the new value.
      }}
    />
  );
};

export const JAddress: React.FC<
  Omit<InputProps, 'onChange' | 'value'> &
    PropType<Field<string>, 'props'> & {
      onItemSelect: (addr: T_ADDR_LOOKUP) => void;
      data: T_ADDR_LOOKUP[];
    }
> = ({ onChange, onItemSelect, data, ...props }) => {
  const toggleMenu = () => {};
  const [selected, selectedSet] = useState(false);
  const onItemSelect_ = (addr: T_ADDR_LOOKUP) => {
    onItemSelect(addr);
    selectedSet(true);
    onChange(addr.label);
  };

  const renderItem = ({ item: addr }: { item: T_ADDR_LOOKUP }) => {
    return <ListItem title={addr.label} onPress={() => onItemSelect_(addr)} />;
  };
  return (
    <View>
      <Input
        {...props}
        onChangeText={text => {
          selectedSet(false);
          onChange(text); // Make sure all of your inputs call `props.onChange` with the new value.
        }}
      />
      {!selected && <List data={data} renderItem={renderItem} />}
    </View>
  );
};
