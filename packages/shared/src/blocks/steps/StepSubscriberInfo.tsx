import _debounce from 'lodash.debounce';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Input, Layout, Text } from 'react-native-ui-kitten';

import api from '../../api';
import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JAddress, JInput } from '../../forms';
import { T_ADDR_LOOKUP } from '../../types';
import styles from './styles';

const StepSubscriberInfo = () => {
  const { next } = useContext(ScreensContext);
  const { updateTUI, updateForm, form } = useContext(FormContext);

  const subscriberName = useField({
    defaultValue: form.subscriberName,
    required: true,
  });
  const customerReference = useField({
    defaultValue: form.customerReference,
    required: true,
  });
  const address = useField({
    defaultValue: form.address,
    required: true,
  });

  const [addressOptions, addressOptionsSet] = useState([] as T_ADDR_LOOKUP[]);

  const lookup = useCallback(
    _debounce(async (address: string) => {
      const data = await api.address.lookup(address);
      addressOptionsSet(data.slice(0, 5));
    }, 1000),
    []
  );
  useEffect(() => {
    address.value.length > 1 && lookup(address.value);
  }, [address.value]);

  function onSubmit() {
    updateForm({
      subscriberName: subscriberName.value,
      customerReference: customerReference.value,
      address: address.value,
    });
  }
  const jform = useForm({
    fields: [subscriberName, customerReference, address],
    onSubmit: onSubmit,
  });

  const goNext = () => {
    jform.submit();
    next();
  };
  return (
    <View style={styles.section}>
      <View>
        <Text category="s1">Subscriber info</Text>
        <View style={styles.formControl}>
          <JInput label="Subscriber name" {...subscriberName.props} />
        </View>
        <View style={styles.formControl}>
          <JInput label="Customer reference" {...customerReference.props} />
        </View>
        <View style={styles.formControl}>
          <JAddress
            label="Address"
            data={addressOptions}
            onItemSelect={(addr: T_ADDR_LOOKUP) => {
              updateTUI(addr.tui);
            }}
            {...address.props}
          />
        </View>
      </View>

      <View style={styles.spacer}></View>
      <Button disabled={!jform.valid} onPress={goNext}>
        Next
      </Button>
    </View>
  );
};

export default StepSubscriberInfo;
