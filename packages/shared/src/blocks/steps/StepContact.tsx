import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const StepContact = () => {
  const { next, prev } = useContext(ScreensContext);
  const { form, updateForm } = useContext(FormContext);
  const orderContactName = useField({
    defaultValue: form.orderContactName,
    required: true,
  });
  const orderContactNumber = useField({
    defaultValue: form.orderContactNumber,
    required: true,
  });
  const orderContactEmail = useField({
    defaultValue: form.orderContactEmail,
    required: true,
  });

  function onSubmit() {
    updateForm({
      orderContactName: orderContactName.value,
      orderContactNumber: orderContactNumber.value,
      orderContactEmail: orderContactEmail.value,
    });
  }
  const jform = useForm({
    fields: [orderContactName, orderContactNumber, orderContactEmail],
    onSubmit: onSubmit,
  });

  const goNext = () => {
    jform.submit();
    next();
  };
  const goPrev = () => {
    jform.submit();
    prev();
  };
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">SkyTV Contact Person</Text>
        <View style={styles.formControl}>
          <JInput
            label="Contact name"
            caption="Contact Name is required"
            {...orderContactName.props}
          />
        </View>
        <View style={styles.formControl}>
          <JInput
            label="Contact number"
            caption="Contact Number is required"
            {...orderContactNumber.props}
          />
        </View>
        <View style={styles.formControl}>
          <JInput
            label="Contact Email"
            caption="Contact Email is required"
            {...orderContactEmail.props}
          />
        </View>
      </View>
      <View style={styles.buttonBlock}>
        <Button onPress={goPrev}>Back</Button>
        <Button disabled={!jform.valid} onPress={goNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepContact;
