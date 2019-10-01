import _debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
    Button, Input, Layout, OverflowMenu, ViewPager
} from 'react-native-ui-kitten';

import api from './api';
import { AppHeader } from './AppHeader';
import { JAddress, JInput } from './forms';
import { T_ADDR_LOOKUP } from './types';

export function App() {
  const [tab, setTab] = useState(0);
  console.log(tab);
  const [visible, visibleSet] = useState(false);
  const toggleMenu = () => {
    visibleSet(!visible);
  };

  let subscriberName = useField({
    defaultValue: '',
  });
  let customerReference = useField({
    defaultValue: '',
  });
  let address = useField({
    defaultValue: '',
  });
  let [addresses, addressesSet] = useState([] as T_ADDR_LOOKUP[]);

  const lookup = useCallback(
    _debounce(async (address: string) => {
      const data = await api.address.lookup(address);
      addressesSet(data.slice(0, 5));
    }, 1000),
    []
  );
  useEffect(() => {
    address.value.length > 1 && lookup(address.value);
  }, [address.value]);
  function onSubmit() {
    console.log('submit', subscriberName.value);
  }
  let form = useForm({
    fields: [subscriberName, customerReference],
    onSubmit: onSubmit,
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppHeader />
        <View
          style={{
            overflow: 'hidden',
          }}
        >
          <ViewPager selectedIndex={tab}>
            <Layout>
              <View style={styles.section}>
                <View style={styles.formControl}>
                  <JInput label="Subscriber name" {...subscriberName.props} />
                </View>
                <View style={styles.formControl}>
                  <JInput
                    label="Customer reference"
                    {...customerReference.props}
                  />
                </View>
                <View style={styles.formControl}>
                  <JAddress
                    label="Address"
                    data={addresses}
                    onItemSelect={() => {}}
                    {...address.props}
                  />
                </View>
              </View>
            </Layout>
            <Layout>
              <Text>Tab 2</Text>
            </Layout>
          </ViewPager>
        </View>
        <View style={styles.section}>
          <Button onPress={() => setTab((tab + 1) % 2)}>Next</Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  formControl: {
    padding: 10,
  },
  section: {
    paddingHorizontal: 12,
  },
});
