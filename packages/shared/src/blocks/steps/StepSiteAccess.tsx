import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const StepSiteAccess = () => {
  const { next, prev } = useContext(ScreensContext);
  const { updateForm, form } = useContext(FormContext);

  const termLocation = useField({
    defaultValue: form.termLocation,
    required: true,
  });
  const siteAccessInformation = useField({
    defaultValue: form.siteAccessInformation,
    required: true,
  });

  function onSubmit() {
    updateForm({
      termLocation: termLocation.value,
      siteAccessInformation: siteAccessInformation.value,
    });
  }
  const jform = useForm({
    fields: [termLocation, siteAccessInformation],
    onSubmit: onSubmit,
  });
  const goNext = () => {
    jform.submit();
    next();
  };

  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <View style={styles.formControl}>
          <JInput
            label="Circuit Termination Location"
            caption="The location where you would like the Fibre box installed"
            {...termLocation.props}
          />
       
        </View>
        <View style={styles.formControl}>
          <JInput
            label="Site Access Infomation"
            caption="For example: There is a dog on site please ring first"
            {...siteAccessInformation.props}
          />
        </View>
      </View>
      <View style={styles.buttonBlock}>
        <Button onPress={prev}>Back</Button>
        <Button disabled={!jform.valid} onPress={goNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepSiteAccess;
