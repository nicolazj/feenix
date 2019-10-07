import React, { useContext } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JRadio } from '../../forms';
import { useOrderStore } from '../../store/order';
import styles from './styles';

const StepProducts = () => {
  const { prequal, updateForm, form } = useOrderStore(({ prequal, updateForm, form }) => ({
    prequal,
    updateForm,
    form,
  }));

  const { next, prev } = useContext(ScreensContext);

  const selectedProduct = useField({
    defaultValue: form.selectedProduct,
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
      selectedProduct: selectedProduct.value,
    });
  }
  const jform = useForm({
    fields: [selectedProduct],
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
        <Text category="h4">Available products</Text>
        <View style={styles.formControl}>
          {prequal && prequal.availableComponentProducts.length > 0 ? (
            <JRadio
              label="Products:"
              options={prequal.availableComponentProducts.map(product => ({
                title: product.product.name,
                value: product.product._id,
              }))}
              {...selectedProduct.props}
            />
          ) : null}
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

export default StepProducts;
