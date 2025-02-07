import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import { useOrderStore } from '../../store/order';
import styles from './styles';

const StepSiteAccess = () => {
  const { next, prev } = useContext(ScreensContext);

  const { updateForm, form} = useOrderStore(({ updateForm, form }) => ({
    updateForm, form
  }));

  const demarc = useField({
    defaultValue: form.demarc,
    required: true,
  });
  const siteAccessInformation = useField({
    defaultValue: form.siteAccessInformation,
    required: true,
  });

  function onSubmit() {
    updateForm({
      demarc: demarc.value,
      siteAccessInformation: siteAccessInformation.value,
    });
  }
  const jform = useForm({
    fields: [demarc, siteAccessInformation],
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
        <View style={styles.formControl}>
          <JInput
            label="Circuit Termination Location"
            caption="The location where you would like the Fibre box installed"
            {...demarc.props}
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
        <Button onPress={goPrev}>Back</Button>
        <Button disabled={!jform.valid} onPress={goNext}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepSiteAccess;
