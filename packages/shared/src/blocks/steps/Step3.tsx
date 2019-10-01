import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const Step2 = () => {
  const { cur, next, prev } = useContext(ScreensContext);

  let siteContactName = useField({
    defaultValue: '',
  });
  let siteContactNumber = useField({
    defaultValue: '',
  });
  let siteContactEmail = useField({
    defaultValue: '',
  });

  let targetDate = useField({
    defaultValue: '',
  });

  function onSubmit() {
    console.log('submit');
  }
  let form = useForm({
    fields: [siteContactName, siteContactNumber, siteContactEmail, targetDate],
    onSubmit: onSubmit,
  });

  return (
    <ScrollView style={styles.section}>
      <Text category="s1">On-site Contact</Text>
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
