import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import { Button, CheckBox, ListItem, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const Step2 = () => {
  const { prequal } = useContext(FormContext);
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
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="s1">Available products</Text>
        <View style={styles.formControl}>
          {prequal &&
            prequal.availableComponentProducts.map(product => (
              <View key={product.product._id}>
                <CheckBox text={product.product.name}></CheckBox>
              </View>
            ))}
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

export default Step2;
