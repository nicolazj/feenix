import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JCheckbox } from '../../forms';
import styles from './styles';

const StepProducts = () => {
  const { prequal, form, updateForm } = useContext(FormContext);
  const { next, prev } = useContext(ScreensContext);

  const selectedProducts = useField<string[]>({
    defaultValue: form.selectedProducts,
    required: true,
    validations: [
      value => {
        let errs = [];
        if (value.length === 0) errs.push('has at least one prodcut');
        return errs;
      },
    ],
  });

  function onSubmit() {
    updateForm({
      selectedProducts: selectedProducts.value,
    });
  }
  const jform = useForm({
    fields: [selectedProducts],
    onSubmit: onSubmit,
  });
  const goNext = () => {
    jform.submit();
    next();
  };
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Available products</Text>
        <View style={styles.formControl}>
          {prequal && prequal.availableComponentProducts.length > 0 ? (
            <JCheckbox
              options={prequal.availableComponentProducts.map(product => ({
                title: product.product.name,
                value: product.product._id,
              }))}
              {...selectedProducts.props}
            />
          ) : (
            <Text status="warning">Sorry, no products available</Text>
          )}
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

export default StepProducts;
