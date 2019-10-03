import _debounce from 'lodash.debounce';
import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JAddress, JInput } from '../../forms';
import { T_ADDR_LOOKUP } from '../../types';
import styles from './styles';

const StepSubscriberInfo = () => {
  const { next } = useContext(ScreensContext);
  const { updateTUI, updateForm, form, tui } = useContext(FormContext);

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
        <Text category="h4">Subscriber info</Text>
        <View style={styles.formControl}>
          <JInput
            label="Subscriber name"
            caption="The full name of the subscriber"
            {...subscriberName.props}
          />
        </View>
        <View style={styles.formControl}>
          <JInput
            label="Customer reference"
            caption="SkyTV Customer Referencer"
            {...customerReference.props}
          />
        </View>
        <View style={styles.formControl}>
          <JAddress
            label="Address"
            onItemSelect={(addr: T_ADDR_LOOKUP) => {
              updateTUI(addr.tui);
            }}
            {...address.props}
          />
          <Text category="c1">
            Full address is required for order, please pick the suffix, level or
            unit listed. If the wrong address is chosen your order will not
            process correctly and will be canceled
          </Text>
        </View>
      </View>

      <View style={styles.spacer}></View>
      <Button disabled={!jform.valid || tui.length === 0} onPress={goNext}>
        Next
      </Button>
    </View>
  );
};

export default StepSubscriberInfo;
