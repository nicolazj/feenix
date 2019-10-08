import React, { useContext, useEffect } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import { ScreensContext } from '../../components/Screens';
import { JSelect } from '../../forms/Select';
import usePrevious from '../../hooks/usePrevious';
import { useOrderStore } from '../../store/order';
import { T_ADDR_PREQUAL } from '../../types';
import styles from './styles';

const getProductOptions = (prequal: T_ADDR_PREQUAL) => {
  return prequal.availableQuickOrderProducts.map(product => ({
    title: product.tailProduct.name,
    value: product.tailProduct._id,
  }));
};

const getProductVariants = (prequal: T_ADDR_PREQUAL, tailProductId: string) => {
  const product = prequal.availableQuickOrderProducts.find(product => product.tailProduct._id === tailProductId);
  if (product) {
    return product.tailVariants.map(va => ({ title: va.name, value: va._id }));
  }
  return [];
};
const StepProducts = () => {
  const { prequal, updateForm, form } = useOrderStore(({ prequal, updateForm, form }) => ({
    prequal,
    updateForm,
    form,
  }));

  const { next, prev } = useContext(ScreensContext);

  const tailProductId = useField({
    defaultValue: form.tailProductId,
    required: true,
  });
  const tailVariantId = useField({
    defaultValue: form.tailVariantId,
    required: true,
  });

  const previousProduct = usePrevious(tailProductId.value);
  useEffect(() => {
    previousProduct && tailVariantId.props.onChange('');
  }, [tailProductId.value]);

  function onSubmit() {
    updateForm({
      tailProductId: tailProductId.value,
      tailVariantId: tailVariantId.value,
    });
  }
  const jform = useForm({
    fields: [tailProductId, tailVariantId],
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
        {prequal ? (
          prequal.availableQuickOrderProducts.length > 0 ? (
            <>
              <View style={styles.formControl}>
                <JSelect label="Products:" options={getProductOptions(prequal)} {...tailProductId.props} />
              </View>
              <View style={styles.formControl}>
                <JSelect
                  label="Products variant:"
                  options={getProductVariants(prequal, tailProductId.value)}
                  {...tailVariantId.props}
                />
              </View>
            </>
          ) : <Text>No available products</Text>
        ) : null}
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
