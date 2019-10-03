import React, { useContext, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Icon, Layout, Modal, Text } from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { LoadingIcon } from '../../components/LoadingIcon';
import { ScreensContext } from '../../components/Screens';
import { JRadio } from '../../forms';
import styles from './styles';

const FacebookIcon = (style: any) => <Icon {...style} name="loader-outline" />;
const StepConfirm = () => {
  const { prequal, form, updateForm } = useContext(FormContext);
  const { prev, next } = useContext(ScreensContext);
  const [modalVisible, modalVisibleSet] = useState(false);
  const [submitting, submittingSet] = useState(false);

  const aim = useField({
    defaultValue: form.aim,
    required: true,
  });

  const selectedProductId = form.selectedProducts[0];
  const selectedProduct = prequal!.availableComponentProducts.find(p => p.product._id === selectedProductId);

  const selectedProductVendorId = selectedProduct && selectedProduct.product.vendor._id;

  const selectedTech = prequal!.technologies.find(t => t.technology === selectedProduct!.product.technology);

  const selectedTechVendor = selectedTech!.vendors.find(v => v.vendor._id === selectedProductVendorId);

  const {
    serviceStatus: { code: serviceStatus },
    installStatus: { code: installStatus },
  } = selectedTechVendor!;

  const connectEnabled = serviceStatus === 'unknown' || (installStatus === 'installed' && serviceStatus === 'none');
  const migrateEnabled = serviceStatus === 'active' || serviceStatus === 'unknown';

  console.log(connectEnabled, migrateEnabled);

  function onSubmit() {
    updateForm({
      aim: aim.value,
    });
  }
  const jform = useForm({
    fields: [],
    onSubmit: onSubmit,
  });

  const goPrev = () => {
    jform.submit();
    prev();
  };
  const PlaceOrder = () => {
    jform.submit();
    modalVisibleSet(true);
  };
  const confirmPlaceOrder = () => {
    submittingSet(true);
    setTimeout(() => {
      modalVisibleSet(false);
      next();
    }, 3000);
  };

  const connectOptions = [
    {
      value: 'New',
      title: 'New Install',
    },
  ];
  if (connectEnabled) {
    connectOptions.push({
      value: 'Connect',
      title: 'Connect',
    });
  }
  if (migrateEnabled) {
    connectOptions.push({
      value: 'Migrate',
      title: 'Migrate Existing Connection',
    });
  }
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Confirm order</Text>
        <View style={styles.formControl}>
          <JRadio label="Connection type" options={connectOptions} {...aim.props} />
        </View>
      </View>

      <View style={styles.buttonBlock}>
        <Button onPress={goPrev}>Back</Button>
        <Button onPress={PlaceOrder}>Place order</Button>
      </View>
      <Modal visible={modalVisible} allowBackdrop={true} backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}>
        <Layout style={{ flex: 1, width: 300, padding: 20 }}>
          <Text category="h4"> Confirm place order</Text>
          <Text style={{ padding: 20 }}>
            Please confirm you wish to place this order. If you do continue to the next stage you are instructing us to
            place orders with our upstream providers, which in most cases will incur costs to your account.
          </Text>
          <Button
            onPress={confirmPlaceOrder}
            disabled={submitting}
            icon={submitting ? style => <LoadingIcon style={style} /> : undefined}
          >
            Place Order
          </Button>
        </Layout>
      </Modal>
    </View>
  );
};

export default StepConfirm;
