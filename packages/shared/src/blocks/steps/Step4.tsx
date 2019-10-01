import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const Step2 = () => {
  const { cur, next, prev } = useContext(ScreensContext);

  let orderContactName = useField({
    defaultValue: '',
  });
  let orderContactNumber = useField({
    defaultValue: '',
  });
  let orderContactEmail = useField({
    defaultValue: '',
  });

  function onSubmit() {
    console.log('submit');
  }
  let form = useForm({
    fields: [orderContactName, orderContactNumber, orderContactEmail],
    onSubmit: onSubmit,
  });

  return (
    <ScrollView style={styles.section}>
      <Text category="s1">SkyTV Contact Person</Text>
      <View style={styles.formControl}>
        <JInput label="Contact name" {...orderContactName.props} />
      </View>
      <View style={styles.formControl}>
        <JInput label="Contact number" {...orderContactNumber.props} />
      </View>
      <View style={styles.formControl}>
        <JInput label="Contact Email" {...orderContactEmail.props} />
      </View>
      <Button
        onPress={() => {
          next();
        }}
      >
        Next
      </Button>
    </ScrollView>
  );
};

export default Step2;
