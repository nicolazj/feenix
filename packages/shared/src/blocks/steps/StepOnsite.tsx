import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const StepOnsite = () => {
  const { next, prev } = useContext(ScreensContext);
  const { form, updateForm } = useContext(FormContext);
  const siteContactName = useField({
    defaultValue: form.siteContactName,
    required: true,
  });
  const siteContactNumber = useField({
    defaultValue: form.siteContactNumber,
    required: true,
  });
  const siteContactEmail = useField({
    defaultValue: form.siteContactEmail,
    required: true,
  });

  const targetDate = useField({
    defaultValue: form.targetDate,
    required: true,
  });

  function onSubmit() {
    updateForm({
      siteContactName: siteContactName.value,
      siteContactNumber: siteContactNumber.value,
      siteContactEmail: siteContactEmail.value,
      targetDate: targetDate.value,
    });
  }
  const jform = useForm({
    fields: [siteContactName, siteContactNumber, siteContactEmail, targetDate],
    onSubmit: onSubmit,
  });

  const goNext = () => {
    jform.submit();
    next();
  };

  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">On-site Contact</Text>
        <View style={styles.formControl}>
          <JInput label="Name" {...siteContactName.props} />
        </View>
        <View style={styles.formControl}>
          <JInput label="Number" {...siteContactNumber.props} />
        </View>
        <View style={styles.formControl}>
          <JInput label="Email" {...siteContactEmail.props} />
        </View>
        <View style={styles.formControl}>
          <JInput label="Installation Date" {...targetDate.props} />
        </View>
      </View>
      <View style={styles.buttonBlock}>
        <Button
          onPress={() => {
            prev();
          }}
        >
          Back
        </Button>
        <Button disabled={!jform.valid} onPress={goNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepOnsite;
