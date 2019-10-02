import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const StepSiteAccess = () => {
  const { cur, next, prev } = useContext(ScreensContext);

  let termLocation = useField({
    defaultValue: '',
  });
  let siteAccessInformation = useField({
    defaultValue: '',
  });

  function onSubmit() {
    console.log('submit');
  }
  let form = useForm({
    fields: [termLocation, siteAccessInformation],
    onSubmit: onSubmit,
  });

  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <View style={styles.formControl}>
          <JInput
            label="Circuit Termination Location"
            {...termLocation.props}
          />
        </View>
        <View style={styles.formControl}>
          <JInput
            label="Site Access Infomation"
            {...siteAccessInformation.props}
          />
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
        <Button
          onPress={() => {
            next();
          }}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default StepSiteAccess;
